import { UserButton } from "@/components/shared/UserButton";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

// page.tsx
export default function PreplitLanding() {
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors">
      <nav className="sticky top-0 w-full flex justify-between items-center py-5 px-12 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-lg z-40 bg-white/80 dark:bg-zinc-950/80">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          preplit
        </h1>
        <div className="flex items-center justify-center gap-8">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="max-w-3xl">
            <div className="font-mono text-emerald-600 dark:text-emerald-400 text-sm mb-4">
              $ simulate_real_interview.sh
            </div>

            <h1 className="text-6xl font-bold leading-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Practice coding interviews the way they're{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                actually conducted
              </span>
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Preplit helps developers practice coding interviews the way
              they're actually conducted — timed, conversational, and
              unpredictable.
            </p>

            <a
              href="/dashboard"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Start Simulating
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-zinc-900 dark:text-zinc-100">
            You can solve LeetCode. You still fail interviews.
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto mb-16">
            Interview performance is a skill separate from problem-solving.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-red-500/50 rounded-xl p-8 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
                Time freezes you
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                You know the solution but panic under a 45-minute countdown.
                Practicing untimed doesn't prepare you for real pressure.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-red-500/50 rounded-xl p-8 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
                Requirements change mid-interview
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Static problem statements don't teach you how to adapt when the
                interviewer adds constraints or asks for optimization.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-red-500/50 rounded-xl p-8 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
                Explaining your thinking is harder than coding
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Interviewers judge how you communicate trade-offs and justify
                decisions, not just whether your code passes tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulation Flow */}
      <section className="py-32 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-20 text-zinc-900 dark:text-zinc-100">
            How an interview actually unfolds
          </h2>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="grid md:grid-cols-[80px_1fr] gap-6 pb-12 border-l-2 border-zinc-300 dark:border-zinc-700 relative">
              <div className="flex items-start justify-center pt-1">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg -ml-6.25 text-white">
                  1
                </div>
              </div>
              <div className="pb-8">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  00:00 - 02:00
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                  Initial problem reveal
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  You receive a partial prompt. Not the full problem statement.
                  Just like a real interviewer would describe it verbally.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="text-zinc-500">interviewer:</span> "Design a
                  function that finds duplicate entries in a dataset..."
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-[80px_1fr] gap-6 pb-12 border-l-2 border-zinc-300 dark:border-zinc-700 relative">
              <div className="flex items-start justify-center pt-1">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg -ml-6.25 text-white">
                  2
                </div>
              </div>
              <div className="pb-8">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  02:00 - 08:00
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                  Clarify requirements
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Ask questions. Confirm constraints. This is where most
                  candidates lose points by making wrong assumptions.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-emerald-600 dark:text-emerald-400 mb-2">
                    you: "Should I optimize for space or time complexity?"
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    <span className="text-zinc-500">interviewer:</span> "Time is
                    more critical here."
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-[80px_1fr] gap-6 pb-12 border-l-2 border-zinc-300 dark:border-zinc-700 relative">
              <div className="flex items-start justify-center pt-1">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg -ml-6.25 text-white">
                  3
                </div>
              </div>
              <div className="pb-8">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  08:00 - 20:00
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                  Start with brute force, explain your approach
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  You're expected to think aloud. Outline your strategy before
                  coding. Show your thought process, not just your final answer.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300">
                  <div className="text-amber-600 dark:text-amber-400 mb-1">
                    // First approach: nested loops - O(n²)
                  </div>
                  <div className="text-zinc-500">
                    // I'll start simple, then optimize...
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-[80px_1fr] gap-6 pb-12 border-l-2 border-zinc-300 dark:border-zinc-700 relative">
              <div className="flex items-start justify-center pt-1">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg -ml-6.26 text-white">
                  4
                </div>
              </div>
              <div className="pb-8">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  20:00 - 35:00
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                  Handle follow-ups and optimization requests
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Mid-solution, the interviewer adds constraints. Can you adapt
                  without restarting? This tests composure under shifting
                  requirements.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-zinc-600 dark:text-zinc-400 mb-2">
                    <span className="text-zinc-500">interviewer:</span> "What if
                    the dataset doesn't fit in memory?"
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    you: "I'd switch to a streaming approach with external
                    sorting..."
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="grid md:grid-cols-[80px_1fr] gap-6 pb-0 border-l-2 border-transparent relative">
              <div className="flex items-start justify-center pt-1">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg -ml-6.25 border-2 border-white dark:border-zinc-950 text-white">
                  5
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                  35:00 - 45:00
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                  Edge cases and final refinement
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  The clock is running out. Can you identify edge cases, explain
                  trade-offs, and write clean code simultaneously? This is the
                  reality of interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-zinc-100">
              Most platforms teach you to solve problems.
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Preplit teaches you to perform under observation.
              </span>
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  Problems aren't static. Neither are interviews.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Requirements evolve as you code. Preplit mirrors this by
                  gradually revealing constraints, just like real interviewers
                  do.
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  Time pressure isn't optional.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Every session is timed. You learn when to optimize, when to
                  move on, and how to manage cognitive load when the clock
                  matters.
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  Communication is evaluated, not just code.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Feedback covers how you explained your reasoning, justified
                  trade-offs, and responded to hints. Like an actual interviewer
                  would assess you.
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  Think like a hireable engineer.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Solving faster doesn't make you hireable. Structured thinking,
                  adaptability, and clear communication do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-32 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-20 text-zinc-900 dark:text-zinc-100">
            Built for developers who already know DSA
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
                You're ready if you:
              </h3>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Can solve medium problems on LeetCode but struggle in live
                    settings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Know the concepts but freeze when explaining them verbally
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Are preparing for product-based companies (FAANG, startups,
                    top tech firms)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓
                  </span>
                  <span>
                    Have been rejected despite "getting the logic right"
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
                Who this is for:
              </h3>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1">
                    →
                  </span>
                  <span>Final-year CS students preparing for placements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1">
                    →
                  </span>
                  <span>
                    Developers with 1–5 years experience switching roles
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1">
                    →
                  </span>
                  <span>
                    Self-taught engineers who need interview communication
                    practice
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1">
                    →
                  </span>
                  <span>
                    Anyone frustrated by the gap between practice and real
                    interviews
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
              After consistent practice, you'll stop treating interviews like
              exams
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
              You'll recognize interview patterns. You'll know when to clarify,
              when to optimize, and how to recover from mistakes. You'll think
              and communicate like someone who's done this before.
            </p>

            <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-left mb-12">
              <div className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Expected outcomes after 20+ simulations:
              </div>
              <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    •
                  </span>
                  <span>
                    Natural articulation of thought process without rehearsed
                    scripts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    •
                  </span>
                  <span>
                    Calm responses to mid-interview constraint changes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    •
                  </span>
                  <span>
                    Awareness of when to optimize vs when to move forward
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    •
                  </span>
                  <span>
                    Confidence in handling ambiguity and incomplete information
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Start Your First Simulation
            </a>

            <p className="text-sm text-zinc-500 mt-6">
              No signup required to try. Experience the difference immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-indigo-600 dark:text-indigo-400 text-xl font-bold">
              preplit
            </div>
            <div className="text-zinc-500 text-sm">
              Built by engineers who've given interviews, for engineers
              preparing for them.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
