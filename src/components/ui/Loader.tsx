interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

function Loader({ size = "md", text }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-slate-200 border-t-emerald-600`}
        aria-label="Loading"
      />

      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}

export default Loader;
