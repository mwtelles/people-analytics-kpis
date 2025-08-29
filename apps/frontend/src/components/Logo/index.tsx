import { motion } from "framer-motion";
import * as S from "./style";

export default function LogoWithText() {
  const pathD =
    "M23.3565 0.365261L34.4108 11.6429L22.3974 23.899L22.3986 23.9003L22.2898 24.0113L28.8085 30.6618L23.8731 35.6969L12.0065 24.2546L24.7298 11.2743L23.3894 9.90676L10.6283 22.9257L5.29386 17.782L23.3565 0.365261ZM30.149 29.2942L35.0269 24.3177L35.0269 13.7508L24.9701 24.0108L30.149 29.2942ZM2.65332 17.7806L21.0933 0L10.2592 0L0 10.4664L0 25.2681L10.2592 35.7346L21.2701 35.7345L2.65989 17.7898Z";

  return (
    <S.Container>
      <motion.svg
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.85, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover="hover"
      >
        <S.InternPath
          d={pathD}
          strokeWidth="0.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <S.ExternPath
          d={pathD}
          stroke="none"
          fillRule="evenodd"
          clipRule="evenodd"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />
      </motion.svg>
    </S.Container>
  );
}
