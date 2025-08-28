import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useFeatureFlags } from "../../contexts/FeatureFlags";
import * as S from "./style";

export default function SwitchMode() {
  const { flags, toggleChallenge } = useFeatureFlags();
  const isBoost = !!flags.challenge;

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbSize = 24;
  const padding = 4;
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      setMaxX(trackWidth - thumbSize - padding * 2);
    }
  }, [isBoost]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleChallenge();
    }
  };

  return (
    <S.SwitchWrapper>
      <S.Track
        ref={trackRef}
        $checked={isBoost}
        onClick={toggleChallenge}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={isBoost}
        tabIndex={0}
      >
        <S.InnerText $checked={isBoost}>
          {isBoost ? "Desenvolvedor" : "Desafio"}
        </S.InnerText>

        <S.Thumb
          initial={false}
          animate={{ x: isBoost ? maxX : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.8,
          }}
        />
      </S.Track>
    </S.SwitchWrapper>
  );
}
