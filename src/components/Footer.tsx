import { Icons } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center">
        <p className="flex items-center gap-1.5 font-display text-lg text-rose">
          <Icons.flower className="h-5 w-5" strokeWidth={2.25} />
          Harumi
        </p>
        <p className="text-sm text-inkSoft">
          Feita com carinho para deixar seu servidor mais fofo.
        </p>
      </div>
    </footer>
  );
}
