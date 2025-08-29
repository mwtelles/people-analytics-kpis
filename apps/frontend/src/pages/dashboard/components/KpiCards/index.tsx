import { motion } from "framer-motion";
import * as S from "./style";
import { formatValue } from "../../../../utils/formatValue";

interface Props {
  summary: {
    headcount: { last: number; avg: number; max: number };
    turnover: { last: number; max: number };
  } | null;
}

export default function KpiCards({ summary }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <S.GridContainer>
        <S.Card data-tour="card-headcount">
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Headcount Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.last ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card data-tour="card-average-headcount">
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Média Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.avg ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card data-tour="card-max-headcount">
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.max ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card data-tour="card-turnover">
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Turnover Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.last ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card data-tour="card-max-turnover">
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Turnover</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.max ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>
      </S.GridContainer>
    </motion.div>
  );
}
