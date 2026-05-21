import type { Metadata } from "next";
import { WizardShell } from "@/components/onboarding/wizard-shell";

export const metadata: Metadata = { title: "Onboarding — MD Assessoria" };

export default function OnboardingPage() {
  return <WizardShell />;
}
