import { TopHeader } from "@/components/layout/top-header";

// Esqueleto sem auth check — quando Supabase Auth for plugado, este layout
// vai carregar perfil/role do user e proteger o grupo /(dashboard).

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <TopHeader />
      <main className="flex-1 overflow-auto px-4 pb-12 pt-6 sm:px-8">
        {children}
      </main>
    </div>
  );
}
