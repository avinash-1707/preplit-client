// Label + input + error wrapper shared by every field across the auth
// pages. Replaces the old heavy inline error-icon SVGs with a small dot.

import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  error,
  action,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-xs font-medium uppercase tracking-wide text-zinc-500"
        >
          {label}
        </label>
        {action}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400/90">
          <span className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  );
}
