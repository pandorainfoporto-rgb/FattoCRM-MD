"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { pergunta: string; resposta: string };
type Props = { items: Item[] };

export function Faq({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-md-gray-200 rounded-lg border border-md-gray-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-medium text-md-navy-deep">
                {item.pergunta}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-md-gold transition-transform",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>
            <div
              className={cn(
                "grid transition-all",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-md-gray-700">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
