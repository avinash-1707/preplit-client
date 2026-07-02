import { Link } from "next-view-transitions";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <div className="text-base font-bold text-zinc-100">
            preplit<span className="text-[#E8A33D]">.</span>
          </div>
          <p className="mt-1 text-sm text-zinc-600">
            Practice interviews out loud.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          <Link href="/signup" className="transition-colors duration-200 hover:text-zinc-200">
            Sign up
          </Link>
          <Link href="/login" className="transition-colors duration-200 hover:text-zinc-200">
            Log in
          </Link>
          <Link href="/dashboard" className="transition-colors duration-200 hover:text-zinc-200">
            Dashboard
          </Link>
        </div>

        <p className="text-xs text-zinc-700">
          Built by people who&apos;ve sat on both sides of the table.
        </p>
      </div>
    </footer>
  );
}
