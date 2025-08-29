import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}

export default function Select({ value, onChange, options, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  return (
    <S.Wrapper>
      <S.Trigger
        ref={triggerRef}
        onClick={() => setOpen((p) => !p)}
        role="button"
        aria-expanded={open}
      >
        {selected ? selected.label : placeholder || "Selecione"}
        <S.TriggerIcon $open={open} />
      </S.Trigger>

      <AnimatePresence>
        {open && (
          <S.Dropdown
            as={motion.ul}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <S.Option
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                $active={opt.value === value}
              >
                {opt.label}
              </S.Option>
            ))}
          </S.Dropdown>
        )}
      </AnimatePresence>
    </S.Wrapper>
  );
}
