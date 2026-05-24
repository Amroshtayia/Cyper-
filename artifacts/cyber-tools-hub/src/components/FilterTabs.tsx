interface FilterTabsProps<T extends string> {
  selectedOS: T;
  onOSChange: (os: T) => void;
  options: T[];
  labels: Record<T, string>;
}

export function FilterTabs<T extends string>({ selectedOS, onOSChange, options, labels }: FilterTabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Operating System">
      {options.map((os) => (
        <button
          key={os}
          role="tab"
          aria-selected={selectedOS === os}
          onClick={() => onOSChange(os)}
          data-testid={`tab-os-${os}`}
          className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedOS === os
              ? "bg-primary text-primary-foreground shadow-[0_0_14px_rgba(0,240,255,0.35)]"
              : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {labels[os]}
        </button>
      ))}
    </div>
  );
}
