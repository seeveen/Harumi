import { Icons } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="mt-24 px-3 pb-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 rounded-blob-lg border border-line bg-surface/60 px-6 py-10 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-brand">
          <Icons.flower className="h-4 w-4 text-bg" strokeWidth={2.5} />
        </span>
        <p className="mt-1 font-display text-lg text-ink">Harumi</p>
        <p className="text-sm text-inkSoft">
          Feita com carinho para deixar seu servidor mais fofo.
        </p>
      </div>
    </footer>
  );
}
