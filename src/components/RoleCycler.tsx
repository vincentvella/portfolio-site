"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/classname";

type RoleCyclerProps = {
  roles: string[];
  intervalMs?: number;
  className?: string;
};

export function RoleCycler({
  roles,
  intervalMs = 2800,
  className,
}: RoleCyclerProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || roles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, roles.length, intervalMs]);

  return (
    <div
      role="text"
      aria-label={`Roles: ${roles.join(", ")}`}
      className={cn("relative h-7 overflow-hidden", className)}
    >
      {roles.map((role, i) => (
        <span
          key={role}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 inline-flex items-center font-display text-base font-bold uppercase tracking-widest transition-all duration-500 ease-out",
            i === index
              ? "translate-y-0 opacity-100"
              : i === (index - 1 + roles.length) % roles.length
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0",
          )}
        >
          {role}
        </span>
      ))}
    </div>
  );
}
