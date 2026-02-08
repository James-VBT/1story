"use client";

import Button from "./Button";

export default function ContactForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
        />
        <input
          type="email"
          placeholder="Email *"
          className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
        />
      </div>
      <input
        type="text"
        placeholder="Phone"
        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
      />
      <input
        type="text"
        placeholder="Subject"
        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
      />
      <textarea
        placeholder="Message"
        rows={4}
        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm resize-none focus:outline-none focus:border-teal transition-colors"
      />
      <Button variant="primary" type="submit" className="w-full">
        Send
      </Button>
    </form>
  );
}
