import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as S from "./style";
import { api } from "../../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AiChatDrawer({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const askMutation = useMutation({
    mutationFn: async (question: string) => {
      const { data } = await api.post("/ai/qa", {
        email: "daniellewinters@kpis.tech",
        question,
      });
      return data.text as string;
    },
    onSuccess: (answer) => {
      setMessages((msgs) => [...msgs, { role: "assistant", text: answer }]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", text: input }]);
    askMutation.mutate(input);
    setInput("");
  };

  if (!open) return null;

  return (
    <S.Drawer>
      <S.Header>
        <span>🤖 Assistente de KPIs</span>
        <button onClick={onClose}>✕</button>
      </S.Header>

      <S.Messages>
        {messages.map((m, i) => (
          <S.Message key={i} $role={m.role}>
            {m.text}
          </S.Message>
        ))}
        {askMutation.isPending && <S.Message $role="assistant">...</S.Message>}
      </S.Messages>

      <S.InputRow>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Pergunte sobre headcount ou turnover..."
        />
        <button onClick={handleSend}>Enviar</button>
      </S.InputRow>
    </S.Drawer>
  );
}
