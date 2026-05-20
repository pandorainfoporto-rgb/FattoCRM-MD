import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// Placeholder visual pra slots de imagem ainda não produzidos.
// Documentação dos slots em Brand/imagens-referencia/README.md.
// Quando imagem chegar: substituir <ImageSlot> por <Image src=... /> do next/image.
type Props = {
  /** ID curto pra referência em Brand/imagens-referencia/ (ex.: "hero-dor", "advogado-handshake") */
  slotId: string;
  /** Descrição da cena (DOR → SOLUÇÃO → REALIZAÇÃO) */
  description: string;
  /** "dor" | "transicao" | "realizacao" — define tom do placeholder */
  tone?: "dor" | "transicao" | "realizacao";
  className?: string;
  /** Razão de aspecto Tailwind (ex.: "aspect-[4/5]") */
  aspect?: string;
};

const toneStyles: Record<NonNullable<Props["tone"]>, string> = {
  dor: "bg-gradient-to-br from-md-navy-deep via-md-navy to-slate-800 text-md-paper/70",
  transicao: "bg-gradient-to-br from-md-navy to-slate-500 text-md-paper/80",
  realizacao: "bg-gradient-to-br from-md-gold-soft via-md-gold to-amber-400 text-md-navy-deep",
};

export function ImageSlot({
  slotId,
  description,
  tone = "transicao",
  className,
  aspect = "aspect-[4/5]",
}: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-lg",
        aspect,
        toneStyles[tone],
        className,
      )}
      role="img"
      aria-label={description}
      data-slot={slotId}
    >
      <ImageIcon className="h-10 w-10 opacity-40" strokeWidth={1.5} />
      <span className="mt-3 px-6 text-center font-display text-sm">
        {description}
      </span>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] opacity-50">
        slot:{slotId}
      </span>
    </div>
  );
}
