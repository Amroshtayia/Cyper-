export function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col gap-4 h-[240px] animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-5 bg-primary/10 rounded w-1/2" />
          <div className="h-4 bg-primary/5 rounded w-1/4" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="h-3 bg-muted/20 rounded w-full" />
        <div className="h-3 bg-muted/20 rounded w-5/6" />
        <div className="h-3 bg-muted/20 rounded w-4/6" />
      </div>
      <div className="mt-auto pt-4 border-t border-border/60 flex justify-between">
        <div className="h-4 bg-muted/20 rounded w-1/3" />
        <div className="h-4 bg-muted/20 rounded w-4" />
      </div>
    </div>
  );
}
