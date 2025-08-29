import { useEffect, useState } from "react";
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
  onValidityChange?: (isValid: boolean) => void;
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
  onValidityChange,
}: EmailInputProps) {
  const [touched, setTouched] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  const validate = (email: string): string | null => {
    if (required && !email) return "Campo obrigatório";

    if (email) {
      const [, domainPart] = email.split("@");
      if (!emailRegex.test(email)) return "Formato de e-mail inválido";

      if (domainWhitelist && domainWhitelist.length > 0) {
        const lower = email.toLowerCase();
        const validDomain = domainWhitelist.some((d) =>
          lower.endsWith(`@${d.toLowerCase()}`) || lower.endsWith(`.${d.toLowerCase()}`)
        );
        if (!validDomain) {
          return `Use um e-mail corporativo válido (${domainWhitelist.join(", ")})`;
        }
      }

      if (!domainPart || domainPart.length < 2) {
        return "Formato de e-mail inválido";
      }
    }

    return null;
  };

  const rawError = validate(value);

  const finalError =
    externalError ||
    (submitted && rawError === "Campo obrigatório") ||
    (touched && value && rawError)
      ? rawError
      : null;

  const isValid = !rawError;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

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
