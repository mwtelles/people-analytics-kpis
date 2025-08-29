import { motion } from "framer-motion";
import * as S from "./style";
import { DatePicker } from "../../../../components/DatePicker";
import Select from "../../../../components/Select";
import { Scope } from "../../../../hooks/useKpis";
import { formatMonth } from "../../../../utils/date";

interface Props {
  scope: Scope;
  onScopeChange: (val: Scope) => void;
  from: string;
  to: string;
  onRangeChange: (range: [string, string]) => void;
  initialFrom: string;
  initialTo: string;
}

export default function DashboardHeader({
  scope,
  onScopeChange,
  from,
  to,
  onRangeChange,
  initialFrom,
  initialTo,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <S.Toolbar>
        <S.HeadlineContainer data-tour="headline">
          <S.Headline
            as={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            People Analytics <span>KPIs</span>
          </S.Headline>

          <S.Subheadline
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Os dados do usuário já estão disponíveis de{" "}
            <strong>{formatMonth(from, { format: "short", showYear: "numeric" })}</strong> até{" "}
            <strong>{formatMonth(to, { format: "short", showYear: "numeric" })}</strong>.
          </S.Subheadline>
        </S.HeadlineContainer>

        <S.Wrapper>
          <S.SelectContainer data-tour="scope-select">
            <Select
              value={scope}
              onChange={(val) => onScopeChange(val as Scope)}
              options={[
                { value: "total", label: "Total" },
                { value: "grouped", label: "Diretos vs Indiretos" },
                { value: "hierarchy", label: "Hierarquia" },
              ]}
            />
          </S.SelectContainer>
          <S.DateContainer data-tour="date-picker">
            <DatePicker
              mode="range"
              variant="dropdown"
              value={[from, to]}
              defaultValue={[initialFrom, initialTo]}
              dateFormat="YYYY-MM"
              onChange={(val) => {
                if (Array.isArray(val)) onRangeChange(val);
              }}
              shortcuts={[
                "thisMonth",
                "last3Months",
                "last6Months",
                "thisYear",
                "lastYear",
                "last3Years",
                "last5Years",
              ]}
            />
          </S.DateContainer>
        </S.Wrapper>
      </S.Toolbar>
    </motion.div>
  );
}
