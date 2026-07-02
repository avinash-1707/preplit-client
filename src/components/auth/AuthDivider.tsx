// Thin label-between-rules divider used between the social buttons and the
// email form on the login and signup pages.

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-zinc-600">
      <span className="h-px flex-1 bg-zinc-800" />
      {label}
      <span className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}
