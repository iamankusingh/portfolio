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
      className={`group inline-flex min-h-12 items-center justify-between gap-2 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-left text-small font-medium text-text-dark focus-visible:outline-secondary focus-visible:outline-offset-4 ${className}`}
    >
      <span>{children}</span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-text-dark text-primary transition-colors duration-220 group-hover:bg-secondary group-hover:text-text-dark group-focus-visible:bg-secondary group-focus-visible:text-text-dark">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-5 -rotate-45"
        >
          <path d="M4 12h15m-6-6 6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
