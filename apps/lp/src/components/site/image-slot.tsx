import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { slotImages } from "@/lib/images";

// Renderiza a foto real (de lib/images.ts) quando o slotId tem imagem mapeada.
// Senão, cai no placeholder visual (gradient + descrição) — útil pra slots
// ainda não produzidos. Doc dos slots em Brand/imagens-referencia/README.md.
type Props = {
  /** ID do slot — chave em lib/images.ts e referência em Brand/imagens-referencia/ */
  slotId: string;
  /** Descrição da cena (usada no placeholder e como fallback de alt) */
  description: string;
  /** "dor" | "transicao" | "realizacao" — tom do placeholder + overlay */
  tone?: "dor" | "transicao" | "realizacao";
  className?: string;
  /** Razão de aspecto Tailwind (ex.: "aspect-[4/5]") */
  aspect?: string;
  /** prioriza carregamento (usar no hero acima da dobra) */
  priority?: boolean;
};

const toneStyles: Record<NonNullable<Props["tone"]>, string> = {
  dor: "bg-gradient-to-br from-md-navy-deep via-md-navy to-slate-800 text-md-paper/70",
  transicao: "bg-gradient-to-br from-md-navy to-md-cyan-soft text-md-paper/85",
  realizacao: "bg-gradient-to-br from-md-cyan-soft via-md-cyan to-md-success text-white",
};

export function ImageSlot({
  slotId,
  description,
  tone = "transicao",
  className,
  aspect = "aspect-[4/5]",
  priority = false,
}: Props) {
  const img = slotImages[slotId];

  if (img) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-md-navy-deep",
          aspect,
          className,
        )}
      >
        <Image
          src={img.url}
          alt={img.alt || description}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* overlay sutil pra legibilidade de selos/texto sobrepostos */}
        <div
          className={cn(
            "absolute inset-0",
            tone === "realizacao"
              ? "bg-gradient-to-t from-md-navy-deep/20 to-transparent"
              : "bg-gradient-to-t from-md-navy-deep/40 via-transparent to-transparent",
          )}
        />
      </div>
    );
  }

  // Fallback: placeholder visual
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
