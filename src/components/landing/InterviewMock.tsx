// Decorative, stylized mock of a live session: illustrative copy only,
// not real user data. Hidden from assistive tech by the parent.
export function InterviewMock() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-[#E8A33D]/10 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.85)] transition-transform duration-500 sm:rotate-1 sm:hover:rotate-0">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8A33D]" />
            24:18 remaining
          </div>
        </div>

        {/* transcript */}
        <div className="space-y-3 px-5 py-5">
          <div className="max-w-[85%]">
            <div className="mb-1 text-[11px] uppercase tracking-wide text-zinc-600">
              Interviewer
            </div>
            <p className="rounded-xl rounded-tl-sm bg-zinc-900 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-300">
              What happens to your solution if the list doesn&apos;t fit in
              memory?
            </p>
          </div>
          <div className="ml-auto max-w-[85%]">
            <div className="mb-1 flex items-center justify-end gap-2 text-right text-[11px] uppercase tracking-wide text-zinc-600">
              <span className="flex items-end gap-[3px]" aria-hidden="true">
                {[7, 11, 8].map((h, i) => (
                  <span
                    key={i}
                    className="wave-bar w-[2.5px] rounded-full bg-[#E8A33D]/70"
                    style={{ height: `${h}px`, animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </span>
              You
            </div>
            <p className="rounded-xl rounded-tr-sm bg-[#E8A33D]/10 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-200">
              I&apos;d switch to an external merge sort and stream chunks
              from disk instead.
            </p>
          </div>
        </div>

        {/* code panel */}
        <div className="space-y-0.5 border-t border-zinc-900 bg-black/60 px-5 py-4 font-mono text-[13px] leading-6">
          <div className="flex gap-4">
            <span className="select-none text-zinc-700">14</span>
            <span className="text-zinc-500">
              function{" "}
              <span className="text-[#E8A33D]">externalSort</span>(chunks) {"{"}
            </span>
          </div>
          <div className="flex gap-4">
            <span className="select-none text-zinc-700">15</span>
            <span className="text-zinc-400">
              &nbsp;&nbsp;return mergeStreams(chunks);
              <span className="caret-blink text-[#E8A33D]">▍</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="select-none text-zinc-700">16</span>
            <span className="text-zinc-500">{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
