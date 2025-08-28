import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import AiChatDrawer from "../AiChatDrawer";

export default function AiFloatingToggle() {
  const [open, setOpen] = useState(false);
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
    <>
      <S.FloatingWrapper>
        <S.FloatingButton
          onClick={() => setOpen(true)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="ai"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <S.Text>IA</S.Text>
            </motion.div>
          </AnimatePresence>
        </S.FloatingButton>

        <S.Faders>
          <AnimatePresence>
            {hovered &&
              [0, 0.6, 1.2].map((delay, i) => (
                <motion.div
                  key={`hover-${i}`}
                  variants={{
                    animate: { scale: [0.6, 2.5], opacity: [0.6, 0] },
                  }}
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
          </AnimatePresence>
        </S.Faders>
      </S.FloatingWrapper>

      <AiChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
