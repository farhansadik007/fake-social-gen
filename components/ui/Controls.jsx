const INPUT_CLASSES =
  "h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

export function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {label}
      </span>
      {children}
      {hint ? <p className="text-xs text-zinc-400">{hint}</p> : null}
    </div>
  );
}

export function TextInput({ className = "", ...props }) {
  return <input className={`${INPUT_CLASSES} ${className}`} {...props} />;
}

export function TextArea({ className = "", ...props }) {
  return (
    <textarea
      className={`min-h-28 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm leading-relaxed text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 ${className}`}
      {...props}
    />
  );
}

export function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left transition hover:border-zinc-300"
    >
      <span className="flex flex-col">
        <span className="text-sm font-medium text-zinc-800">{label}</span>
        {description ? (
          <span className="text-xs text-zinc-400">{description}</span>
        ) : null}
      </span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          checked ? "bg-zinc-900" : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
    </button>
  );
}

const VARIANTS = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700",
  secondary: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100",
};

export function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
