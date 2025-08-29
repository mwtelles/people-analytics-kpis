import { useState } from "react";
import * as S from "./style";
import { MailOutline } from "@mui/icons-material";
import { motion } from "framer-motion";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  domainWhitelist?: string[];
  externalError?: string | null;
  submitted?: boolean;
  validating?: boolean;
}

export function EmailInput({
  value,
  onChange,
  placeholder = "seu.email@empresa.com",
  label = "E-mail",
  disabled = false,
  required = false,
  domainWhitelist,
  externalError,
  submitted = false,
  validating = false,
}: EmailInputProps) {
  const [touched, setTouched] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  const validate = (email: string): string | null => {
    if (required && !email) return "Campo obrigatório";

    if (email) {
      if (email.includes("@")) {
        const [domain] = email.split("@");
        if (!domain || domain.length < 2) {
          return null;
        }
        if (!emailRegex.test(email)) return "Formato de e-mail inválido";

        if (domainWhitelist && domainWhitelist.length > 0) {
          const validDomain = domainWhitelist.some((d) =>
            email.toLowerCase().endsWith(`@${d.toLowerCase()}`),
          );
          if (!validDomain) {
            return `Use um e-mail corporativo válido (${domainWhitelist.join(", ")})`;
          }
        }
      }
    }

    return null;
  };

  const error = validate(value);

  const finalError =
    externalError || (submitted && error === "Campo obrigatório") || (touched && value && error)
      ? error
      : null;

  const isValid = !finalError && value.length > 0;

  const handleBlur = () => setTouched(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.Wrapper>
      {label && <S.Label>{label}</S.Label>}

      <motion.div
        animate={finalError ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.InputWrapper $hasError={!!finalError} $isValid={isValid} $validating={validating}>
          <S.Icon>
            <MailOutline />
          </S.Icon>
          <S.InputField
            type="email"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!finalError}
            aria-describedby={finalError ? "email-error" : undefined}
          />
        </S.InputWrapper>
      </motion.div>

      {finalError && <S.ErrorMsg id="email-error">{finalError}</S.ErrorMsg>}
    </S.Wrapper>
  );
}
