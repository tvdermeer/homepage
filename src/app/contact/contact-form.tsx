"use client";

import { useForm, ValidationError } from "@formspree/react";
import { siteConfig } from "@/config/site";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(siteConfig.formspreeId);

  if (state.succeeded) {
    return (
      <div className="rounded-lg border border-[#5F8C6B]/15 bg-[#152119] p-8 text-center">
        <p className="text-lg font-semibold text-[#E8F0E9]">
          Thanks for reaching out!
        </p>
        <p className="mt-2 text-[#8FA89A]">
          I&apos;ll get back to you as soon as I can.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Contact form"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#E8F0E9]"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 block w-full rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-4 py-3 text-[#E8F0E9] placeholder-[#8FA89A]/50 focus:border-[#5F8C6B] focus:outline-none focus:ring-1 focus:ring-[#5F8C6B] transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#E8F0E9]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="mt-2 block w-full rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-4 py-3 text-[#E8F0E9] placeholder-[#8FA89A]/50 focus:border-[#5F8C6B] focus:outline-none focus:ring-1 focus:ring-[#5F8C6B] transition-colors"
          placeholder="your@email.com"
        />
        <ValidationError
          field="email"
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#E8F0E9]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 block w-full rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-4 py-3 text-[#E8F0E9] placeholder-[#8FA89A]/50 focus:border-[#5F8C6B] focus:outline-none focus:ring-1 focus:ring-[#5F8C6B] transition-colors resize-y"
          placeholder="What's on your mind?"
        />
        <ValidationError
          field="message"
          errors={state.errors}
          className="mt-1 text-sm text-red-400"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-lg bg-[#5F8C6B] px-6 py-3 text-sm font-semibold text-[#E8F0E9] hover:bg-[#4a7a57] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5F8C6B] focus:ring-offset-2 focus:ring-offset-[#0D1610] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>

      <ValidationError
        errors={state.errors}
        className="text-sm text-red-400"
      />
    </form>
  );
}
