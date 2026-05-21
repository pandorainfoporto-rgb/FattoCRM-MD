"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface AnchorNavProps {
  items: Array<{ id: string; label: string }>;
}

/**
 * Sticky anchor nav — destaca a seção visível e faz scroll suave ao clicar.
 */
export function AnchorNav({ items }: AnchorNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="glass sticky top-20 z-30 -mx-4 mb-6 overflow-x-auto rounded-none border-b border-foreground/[0.08] px-4 py-2 sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
      <ul className="flex gap-1">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cn(
                "block rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors whitespace-nowrap",
                active === it.id
                  ? "bg-[var(--color-azure-500)]/10 text-[var(--color-azure-500)]"
                  : "text-foreground/55 hover:bg-foreground/[0.04] hover:text-foreground",
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
