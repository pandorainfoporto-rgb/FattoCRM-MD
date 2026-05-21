// Layout próprio do onboarding — sem sidebar/top header do dashboard.
// Wizard tem header próprio leve dentro do shell.

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[var(--color-background)]">{children}</div>;
}
