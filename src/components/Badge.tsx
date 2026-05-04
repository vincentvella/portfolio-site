import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/classname";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap",
  {
    variants: {
      look: {
        flat: "border border-transparent bg-muted text-foreground hover:bg-muted/70",
        neo: "border-2 border-foreground rounded-sm uppercase tracking-tight font-bold",
      },
      variant: {
        default: "",
        secondary: "",
        accent: "",
        destructive: "",
        outline: "",
      },
    },
    compoundVariants: [
      {
        look: "neo",
        variant: "default",
        class: "bg-primary text-primary-foreground",
      },
      {
        look: "neo",
        variant: "secondary",
        class: "bg-secondary text-secondary-foreground",
      },
      {
        look: "neo",
        variant: "accent",
        class: "bg-accent text-accent-foreground",
      },
      {
        look: "neo",
        variant: "destructive",
        class: "bg-destructive text-destructive-foreground",
      },
      {
        look: "neo",
        variant: "outline",
        class: "bg-card text-foreground",
      },
    ],
    defaultVariants: {
      look: "flat",
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, look, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, look }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
