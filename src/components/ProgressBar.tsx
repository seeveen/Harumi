type ProgressBarProps = {
  label: string;
  startLabel: string;
  goalLabel: string;
  percent: number; // 0-100
};

export function ProgressBar({ label, startLabel, goalLabel, percent }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-glow">
      <p className="text-xs font-medium text-inkSoft">{label}</p>
      <div className="relative mt-4 h-2 rounded-full bg-surfaceHi">
        <div
          className="h-2 rounded-full bg-grad-brand"
          style={{ width: `${clamped}%` }}
        />
        <div
          className="absolute -top-1.5 h-5 w-5 rounded-full border-2 border-bg bg-white shadow-soft"
          style={{ left: `calc(${clamped}% - 10px)` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-inkSoft">
        <span>{startLabel}</span>
        <span className="font-medium text-rose">{goalLabel}</span>
      </div>
    </div>
  );
}
