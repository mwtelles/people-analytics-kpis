import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import { askQuestion, getInsights, QaResponse } from "../../services/ai";
import { formatMonth } from "../../utils/date";

type Mode = "qa" | "insights";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  qa?: QaResponse;
  insight?: boolean;
  type?: "message" | "error";
}

const QA_SUGGESTIONS = [
  "Qual foi o turnover médio no ano passado?",
  "Como variou o headcount nos últimos 6 meses?",
];

const INSIGHT_SUGGESTIONS = [
  { label: "Resumo do período", action: "run" },
  { label: "Comparar com ano anterior", action: "run" },
];

const LOADING_TEXTS = [
  "Estou pensando na resposta…",
  "Deixe-me pensar…",
  "Estou analisando seu pedido…",
];

function typeWriterEffect(text: string, onUpdate: (t: string) => void, onDone: () => void) {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    onUpdate(text.slice(0, i));
    if (i >= text.length) {
      clearInterval(interval);
      onDone();
    }
  }, 18);
}

function renderInsight(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("**")) {
      return <S.InsightHeading key={i}>{line.replace(/\*\*/g, "")}</S.InsightHeading>;
    }
    if (line.startsWith("-")) {
      return <S.InsightItem key={i}>{line.replace(/^- /, "")}</S.InsightItem>;
    }
    if (line.trim() === "") {
      return <br key={i} />;
    }
    return <p key={i}>{line}</p>;
  });
}

export default function AiFloatingChat() {
  const { email, from, to } = useSearch({ from: "/dashboard" });
  const navigate = useNavigate({ from: "/dashboard" });
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("ai_mode") as Mode) || "qa");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loadingIx, setLoadingIx] = useState(0);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || messages.length) return;
    const seen = localStorage.getItem("ai_seen") === "1";

    if (!seen) {
      localStorage.setItem("ai_seen", "1");

      const hi = `Oi! 👋`;
      const help =
        "Posso te ajudar com KPIs — faça uma pergunta no modo *Perguntar* ou gere um resumo no modo *Insights*.";

      setMessages([{ id: crypto.randomUUID(), role: "assistant", text: hi }]);

      const t = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", text: help },
        ]);
      }, 700);

      return () => clearTimeout(t);
    }
  }, [open, messages.length]);

  useEffect(() => {
    localStorage.setItem("ai_mode", mode);
  }, [mode]);

  const askMutation = useMutation<QaResponse, unknown, string>({
    mutationFn: (question) => askQuestion(email, question),
    onSuccess: (res) => {
      typeWriterEffect(
        res.text,
        (partial) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last.id.startsWith("typing")) {
              return [...prev.slice(0, -1), { ...last, text: partial, qa: res }];
            }
            return [
              ...prev,
              { id: "typing-" + crypto.randomUUID(), role: "assistant", text: partial, qa: res },
            ];
          });
        },
        () => {},
      );
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "⚠️ Desculpe, não consegui responder sua pergunta. Tente novamente.",
        },
      ]);
    },
  });

  const insightMutation = useMutation<{ text: string }, unknown, { from: string; to: string }>({
    mutationFn: (vars) => getInsights(email, vars.from, vars.to),
    onSuccess: (res) => {
      typeWriterEffect(
        res.text,
        (partial) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last.id.startsWith("typing")) {
              return [...prev.slice(0, -1), { ...last, text: partial, insight: true }];
            }
            return [
              ...prev,
              {
                id: "typing-" + crypto.randomUUID(),
                role: "assistant",
                text: partial,
                insight: true,
              },
            ];
          });
        },
        () => {},
      );
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "⚠️ Não consegui gerar o insight agora. Tente novamente mais tarde.",
          type: "error",
        },
      ]);
    },
  });

  const isLoading = askMutation.isPending || insightMutation.isPending;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setLoadingIx(0);
      return;
    }
    const id = setInterval(() => {
      setLoadingIx((i) => (i + 1) % LOADING_TEXTS.length);
    }, 1800);
    return () => clearInterval(id);
  }, [isLoading]);

  const handleSend = async () => {
    if (isLoading) return;

    if (mode === "qa") {
      const q = input.trim();
      if (!q) return;
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: q }]);
      setInput("");
      await askMutation.mutateAsync(q);
      return;
    }

    const q = input.trim() || "Gerar resumo do período";
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: q }]);
    setInput("");
    await insightMutation.mutateAsync({ from, to });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = mode === "qa" ? "Pergunte algo sobre seus KPIs" : "Peça um insight";

  const canSend = mode === "qa" ? input.trim().length > 0 : !isLoading;

  const showSuggestions = useMemo(() => !messages.some((m) => m.role === "user"), [messages]);

  const suggestions = useMemo(() => {
    if (!showSuggestions) return null;
    if (mode === "qa") {
      return (
        <S.Suggestions>
          {QA_SUGGESTIONS.map((s) => (
            <S.Suggestion key={s} onClick={() => setInput(s)}>
              {s}
            </S.Suggestion>
          ))}
        </S.Suggestions>
      );
    }
    return (
      <S.Suggestions>
        {INSIGHT_SUGGESTIONS.map((s) => (
          <S.Suggestion
            key={s.label}
            onClick={() => !isLoading && handleSend()}
            title="Usa o período atual do dashboard"
          >
            {s.label}
          </S.Suggestion>
        ))}
      </S.Suggestions>
    );
  }, [mode, isLoading, showSuggestions]);

  return (
    <S.FloatingWrapper>
      {!open && (
        <S.FloatingButton
          onClick={() => setOpen(true)}
          as={motion.button}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.92 }}
        >
          <S.Text>IA</S.Text>
        </S.FloatingButton>
      )}

      <AnimatePresence>
        {open && (
          <S.ChatContainer
            as={motion.div}
            initial={{ opacity: 0, y: 96 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 96 }}
            transition={{ duration: 0.25 }}
          >
            <S.ChatHeader>
              <S.Title>Assistente IA</S.Title>
              <S.Segmented>
                <S.Segment data-active={mode === "qa"} onClick={() => setMode("qa")}>
                  Perguntar
                </S.Segment>
                <S.Segment data-active={mode === "insights"} onClick={() => setMode("insights")}>
                  Insights
                </S.Segment>
              </S.Segmented>
              <S.CloseButton onClick={() => setOpen(false)}>
                <S.CloseIcon />
              </S.CloseButton>
            </S.ChatHeader>

            <S.ChatBody>
              <S.ChatMessages>
                {messages.map((m) => (
                  <S.MessageRow key={m.id} align={m.role}>
                    {m.role !== "user" && (
                      <S.Avatar side="left">
                        <S.Logo />
                      </S.Avatar>
                    )}
                    <S.Message $role={m.role} $type={m.type}>
                      {m.insight ? (
                        renderInsight(m.text)
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: m.text }} />
                      )}
                      {m.qa?.params && (
                        <S.ParamsBar>
                          <S.ParamChip>{m.qa.params.metric}</S.ParamChip>
                          <S.ParamChip>{m.qa.params.agg}</S.ParamChip>
                          <S.ParamChip>{formatMonth(m.qa.params.from.slice(0, 7))}</S.ParamChip>
                          <S.ParamChip>{formatMonth(m.qa.params.to.slice(0, 7))}</S.ParamChip>
                        </S.ParamsBar>
                      )}
                    </S.Message>
                    {m.role === "user" && (
                      <S.Avatar side="right">
                        <S.UserIcon />
                      </S.Avatar>
                    )}
                  </S.MessageRow>
                ))}

                {isLoading && (
                  <S.MessageRow align="assistant">
                    <S.Avatar side="left">
                      <S.Logo />
                    </S.Avatar>
                    <S.TypingBubble>
                      <S.LoadingText>{LOADING_TEXTS[loadingIx]}</S.LoadingText>
                      <S.Dots>
                        <S.Dot
                          as={motion.span}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <S.Dot
                          as={motion.span}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <S.Dot
                          as={motion.span}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </S.Dots>
                    </S.TypingBubble>
                  </S.MessageRow>
                )}
                <div ref={endRef} />
              </S.ChatMessages>
              {suggestions}
            </S.ChatBody>

            <S.ChatFooter as="form" onSubmit={(e) => (e.preventDefault(), handleSend())}>
              <S.Input
                as={mode === "qa" ? "textarea" : "input"}
                rows={mode === "qa" ? 2 : undefined}
                placeholder={placeholder}
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <S.PrimaryButton type="submit" disabled={!canSend}>
                <S.SendIcon />
              </S.PrimaryButton>
            </S.ChatFooter>
          </S.ChatContainer>
        )}
      </AnimatePresence>
    </S.FloatingWrapper>
  );
}
