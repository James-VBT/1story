"use client";

import { useState } from "react";
import Button from "./Button";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setState("success");
      form.reset();
    } else {
      const body = await res.json().catch(() => ({}));
      setErrorMsg(body.error ?? "Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Name *"
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className={inputClass}
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        className={inputClass}
      />
      <input
        name="subject"
        type="text"
        placeholder="Subject"
        className={inputClass}
      />
      <textarea
        name="message"
        required
        placeholder="Message *"
        rows={4}
        className={`${inputClass} resize-none`}
      />

      {state === "success" && (
        <div className="rounded border border-teal/30 bg-teal/10 px-4 py-3">
          <p className="text-sm font-semibold text-teal">
            Thank you — your message is on its way!
          </p>
          <p className="text-xs text-white/60 mt-1">
            We typically respond within 1–2 business days. Check your inbox (and spam, just in case).
          </p>
        </div>
      )}
      {state === "error" && (
        <div className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3">
          <p className="text-sm font-semibold text-red-400">
            Oops — something went wrong.
          </p>
          <p className="text-xs text-white/60 mt-1">{errorMsg}</p>
        </div>
      )}

      <Button variant="primary" type="submit" className="w-full" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
