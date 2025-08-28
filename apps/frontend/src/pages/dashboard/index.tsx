import { useSearch } from "@tanstack/react-router";
import { useFeatureFlags } from "../../contexts/FeatureFlags";
import ChallengeView from "./views/challenge";
import BoostView from "./views/boost";

export default function Dashboard() {
  const { flags } = useFeatureFlags();
  const { challenge } = flags;

  const search = useSearch({ from: "/dashboard" });

  const { email, from, to } = search;

  return challenge ? (
    <BoostView email={email} from={from} to={to} />
  ) : (
    <ChallengeView email={email} from={from} to={to} />
  );
}
