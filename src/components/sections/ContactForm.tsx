import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const fieldClass =
  "mt-2 block min-h-12 w-full rounded-none border-b border-line-light bg-transparent px-0 py-3 text-body text-text-dark placeholder:text-text-muted-light transition-[border-color] duration-300 ease-out focus:border-text-dark focus:outline-none focus-visible:outline-none motion-reduce:transition-none";

export default function ContactForm({ labelledBy }: { labelledBy: string }) {
  const requestRef = useRef<AbortController | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => () => requestRef.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return;

    const form = event.currentTarget;
    const endpoint: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      setFeedback(
        "Message sending is currently unavailable. Please try again later.",
      );
      return;
    }

    const values = new FormData(form);
    const body = new URLSearchParams();
    for (const name of ["name", "email", "company", "message"]) {
      const value = values.get(name);
      body.set(name, typeof value === "string" ? value.trim() : "");
    }
    if (!body.get("name") || !body.get("message")) {
      setFeedback("Please enter your name and a message, not just spaces.");
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setIsSending(true);
    setFeedback("");
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body,
        credentials: "omit",
        redirect: "follow",
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (!response.ok || !isSuccessfulSubmission(result)) {
        throw new Error("Submission was not acknowledged.");
      }
      form.reset();
      setFeedback("Thank you! Your message has been sent.");
    } catch {
      if (form.isConnected) {
        setFeedback(
          "We couldn’t confirm delivery. Your message is still here. Please wait before trying again, as it may already have arrived.",
        );
      }
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
      if (form.isConnected) setIsSending(false);
    }
  }

  return (
    <form
      aria-labelledby={labelledBy}
      aria-busy={isSending}
      onSubmit={handleSubmit}
      className="min-w-0 p-4 space-y-7 border border-line-light rounded-lg"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-small font-medium">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            readOnly={isSending}
            maxLength={120}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-small font-medium">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            readOnly={isSending}
            maxLength={254}
            placeholder="Your email address"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="text-small font-medium">
          Company{" "}
          <span className="font-normal text-text-muted-light">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          readOnly={isSending}
          maxLength={160}
          placeholder="Your company or studio"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-small font-medium">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          readOnly={isSending}
          rows={2}
          maxLength={5000}
          placeholder="What would you like to create?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-atomic="true" className="text-small text-wrap">
          {feedback}
        </p>
        <button
          type="submit"
          disabled={isSending}
          className="group inline-flex min-h-12 cursor-pointer items-center justify-between gap-6 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-small font-medium focus-visible:outline-text-dark focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-60"
        >
          {isSending ? "Sending…" : "Send message"}
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-text-dark text-primary transition-colors duration-220 group-hover:bg-secondary group-hover:text-text-dark group-focus-visible:bg-secondary group-focus-visible:text-text-dark motion-reduce:transition-none">
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
        </button>
      </div>
    </form>
  );
}

function isSuccessfulSubmission(result: unknown): boolean {
  if (typeof result !== "object" || result === null) return false;
  if ("success" in result) return result.success === true;
  if ("result" in result) return result.result === "success";
  return false;
}
