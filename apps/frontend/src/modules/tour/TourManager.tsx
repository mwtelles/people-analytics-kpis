import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useLocation } from "@tanstack/react-router";
import { useTour } from "../../hooks/useTour";
import { homeSteps } from "./steps/home";
import { dashboardSteps } from "./steps/dashboard";

export default function TourManager() {
  const location = useLocation();
  const { seen, markAsSeen } = useTour();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (location.pathname === "/" && !seen.home) {
      setSteps(homeSteps);
      setRun(true);
    } else if (location.pathname.startsWith("/dashboard") && !seen.dashboard) {
      setSteps(dashboardSteps);
      setRun(true);
    }
  }, [location, seen]);

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (location.pathname === "/") markAsSeen("home");
      if (location.pathname.startsWith("/dashboard")) markAsSeen("dashboard");
      setRun(false);
    }
  };

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      locale={{ next: "Próximo", back: "Voltar", skip: "Pular", last: "Concluir", nextLabelWithProgress: "Próximo ({step} de {steps})" }}
      styles={{
        options: {
          zIndex: 2000,
          primaryColor: "#0086c9",
          backgroundColor: "#fff",
        },
      }}
      callback={handleCallback}
    />
  );
}
