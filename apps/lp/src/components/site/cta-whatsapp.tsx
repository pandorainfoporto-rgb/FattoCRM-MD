import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Props = {
  message: string;
  label?: string;
  variant?: "primary" | "whatsapp" | "ghost-light";
  className?: string;
  size?: "default" | "lg";
};

export function CtaWhatsapp({
  message,
  label = "Falar com um advogado pelo WhatsApp",
  variant = "whatsapp",
  className,
  size = "default",
}: Props) {
  const baseStyle =
    variant === "primary"
      ? "btn-primary"
      : variant === "ghost-light"
        ? "btn-ghost-light"
        : "btn-whatsapp";

  return (
    <a
      href={buildWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseStyle, size === "lg" && "px-8 py-4 text-lg", className)}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
      {label}
    </a>
  );
}

export function FloatingWhatsapp({ message }: { message: string }) {
  return (
    <a
      href={buildWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-md-card-lg transition hover:scale-105"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7 text-white" strokeWidth={1.5} />
    </a>
  );
}
