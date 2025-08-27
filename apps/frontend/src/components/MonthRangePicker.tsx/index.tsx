import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";
import { parseMonth } from "../../utils/date";

interface MonthRangePickerProps {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

const months = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

function toKey(year: number | string, month: number | string) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function MonthRangePicker({ from, to, onChange }: MonthRangePickerProps) {
  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 15 }, (_, i) => now - 10 + i);
  }, []);

  const [fromYear, fromMonth] = from.split("-");
  const [toYear, toMonth] = to.split("-");

  const handleFromChange = (year: string, month: string) => {
    const newFrom = toKey(year, month);
    const fromDate = parseMonth(newFrom);
    const toDate = parseMonth(to);

    if (fromDate > toDate) {
      onChange(newFrom, newFrom);
    } else {
      onChange(newFrom, to);
    }
  };

  const handleToChange = (year: string, month: string) => {
    const newTo = toKey(year, month);
    const fromDate = parseMonth(from);
    const toDate = parseMonth(newTo);

    if (toDate < fromDate) {
      onChange(newTo, newTo);
    } else {
      onChange(from, newTo);
    }
  };

  return (
    <Box display="flex" gap={2}>
      <FormControl size="small">
        <InputLabel>Ano início</InputLabel>
        <Select
          value={fromYear}
          label="Ano início"
          onChange={(e) => handleFromChange(e.target.value, fromMonth)}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y.toString()}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Mês início</InputLabel>
        <Select
          value={fromMonth}
          label="Mês início"
          onChange={(e) => handleFromChange(fromYear, e.target.value)}
        >
          {months.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Ano fim</InputLabel>
        <Select
          value={toYear}
          label="Ano fim"
          onChange={(e) => handleToChange(e.target.value, toMonth)}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y.toString()}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Mês fim</InputLabel>
        <Select
          value={toMonth}
          label="Mês fim"
          onChange={(e) => handleToChange(toYear, e.target.value)}
        >
          {months.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
