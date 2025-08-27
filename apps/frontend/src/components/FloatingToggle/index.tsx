import { useFeatureFlags } from "../../contexts/FeatureFlags";
import * as S from "./style";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faderVariants = {
  animate: {
    scale: [0.6, 2.5],
    opacity: [0.6, 0],
  },
};

export default function FloatingToggle() {
  const { flags, toggleChallenge } = useFeatureFlags();
  const [hovered, setHovered] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    setExiting(false);
  };

  const handleLeave = () => {
    setHovered(false);
    setExiting(true);

    setTimeout(() => setExiting(false), 1500);
  };

  return (
    <S.FloatingWrapper>
      <S.FloatingButton
        onClick={toggleChallenge}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 0.9 }}
        $active={flags.challenge}
      >
        <AnimatePresence mode="wait">
          {flags.challenge ? (
            <motion.div
              key="boost"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <S.Text $active>ON</S.Text>
            </motion.div>
          ) : (
            <motion.div
              key="challenge"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <S.Text>OFF</S.Text>
            </motion.div>
          )}
        </AnimatePresence>
      </S.FloatingButton>

      <S.Faders>
        <AnimatePresence>
          {hovered &&
            [0, 0.6, 1.2].map((delay, i) => (
              <motion.div
                key={`hover-${i}`}
                variants={faderVariants}
                animate="animate"
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  delay,
                  repeat: Infinity,
                }}
                style={S.faderStyle}
              />
            ))}

          {exiting &&
            [0, 0.4].map((delay, i) => (
              <motion.div
                key={`exit-${i}`}
                variants={faderVariants}
                animate="animate"
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay,
                  repeat: 0,
                }}
                style={S.faderStyle}
              />
            ))}
        </AnimatePresence>
      </S.Faders>
    </S.FloatingWrapper>
  );
}
