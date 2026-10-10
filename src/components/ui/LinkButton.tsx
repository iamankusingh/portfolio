import { Link } from "react-router";
import type { LinkProps } from "react-router";

export default function LinkButton({
  children,
  className = "",
  ...props
}: LinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center justify-between gap-8 border-b border-current py-3 text-small font-medium transition-colors duration-220 hover:text-water focus-visible:outline-offset-8 motion-reduce:transition-none ${className}`}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5 shrink-0 transition-transform duration-220 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <path d="M4 12h15m-6-6 6 6-6 6" />
      </svg>
    </Link>
  );
}
