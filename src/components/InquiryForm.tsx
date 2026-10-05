"use client";

import { useMemo, useState } from "react";
import { EVENT_TYPES, SERVICE_INTERESTS, validateInquiry, type EventInquiryInput } from "@/lib/inquiries";

type Props = {
  kind?: "event" | "contact";
};

const empty: EventInquiryInput = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  eventType: "",
  guestCount: "",
  services: [],
  details: "",
};

export function InquiryForm({ kind = "event" }: Props) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const title = kind === "event" ? "Tell Sydney about the gathering" : "Write to Sydney";

  const payload = useMemo(() => ({ ...values, kind }), [values, kind]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateInquiry(values, kind);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not send the inquiry.");
      setStatus("sent");
      setMessage(
        kind === "event"
          ? "Your event inquiry is on its way. If the date works, Sydney will follow up and can send a Square invoice once details are set."
          : "Your note is on its way. For appointments, Square remains the place to book, reschedule, and pay.",
      );
      setValues(empty);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  function update<K extends keyof EventInquiryInput>(key: K, value: EventInquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleService(name: string) {
    setValues((current) => ({
      ...current,
      services: current.services.includes(name)
        ? current.services.filter((item) => item !== name)
        : [...current.services, name],
    }));
  }

  if (status === "sent") {
    return (
      <div className="status" role="status">
        <h3>Received, beautifully.</h3>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h3>{title}</h3>
      <label className="field">
        <span>Name</span>
        <input autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} required />
        {errors.name ? <span className="error">{errors.name}</span> : null}
      </label>
      <label className="field">
        <span>Email</span>
        <input type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} required />
        {errors.email ? <span className="error">{errors.email}</span> : null}
      </label>
      <label className="field">
        <span>Phone</span>
        <input type="tel" autoComplete="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} required />
        {errors.phone ? <span className="error">{errors.phone}</span> : null}
      </label>
      {kind === "event" ? (
        <>
          <label className="field">
            <span>Preferred date</span>
            <input type="date" value={values.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} required />
            {errors.preferredDate ? <span className="error">{errors.preferredDate}</span> : null}
          </label>
          <label className="field">
            <span>Event type</span>
            <select value={values.eventType} onChange={(e) => update("eventType", e.target.value)} required>
              <option value="">Choose one</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.eventType ? <span className="error">{errors.eventType}</span> : null}
          </label>
          <label className="field">
            <span>Number of guests</span>
            <input
              inputMode="numeric"
              value={values.guestCount}
              onChange={(e) => update("guestCount", e.target.value)}
              required
            />
            {errors.guestCount ? <span className="error">{errors.guestCount}</span> : null}
          </label>
          <fieldset className="field">
            <legend>Services of interest</legend>
            <div className="checks">
              {SERVICE_INTERESTS.map((service) => (
                <label key={service}>
                  <input
                    type="checkbox"
                    checked={values.services.includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
            {errors.services ? <span className="error">{errors.services}</span> : null}
          </fieldset>
        </>
      ) : null}
      <label className="field">
        <span>{kind === "event" ? "Additional information" : "How can Sydney help?"}</span>
        <textarea value={values.details} onChange={(e) => update("details", e.target.value)} />
        {errors.details ? <span className="error">{errors.details}</span> : null}
      </label>
      <p className="quiet">
        This form is for questions and event planning only. Appointments, deposits, invoices, and cards are processed in
        Square — never on this page.
      </p>
      {status === "error" ? <p className="error">{message}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : kind === "event" ? "Send event inquiry" : "Send message"}
      </button>
    </form>
  );
}
