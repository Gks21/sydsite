import Link from "next/link";
import { formatDuration, type AppointmentService } from "@/lib/square/types";
import { publicConfig } from "@/lib/config";

export function ServiceMenu({
  services,
  emptyLabel = "The live menu, prices, durations, and booking requirements live in Square.",
}: {
  services: AppointmentService[];
  emptyLabel?: string;
}) {
  if (!services.length) {
    return (
      <div className="status">
        <p>{emptyLabel}</p>
        <p className="quiet">
          Square is the source of truth, so this page does not guess at availability or invent a price list. Open booking
          to see what Sydney is offering right now.
        </p>
        <p>
          <Link className="btn btn-primary" href="/book">
            View the live menu
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="menu">
      {services.map((service) => {
        const price = service.price?.formatted;
        const duration = formatDuration(service.durationMinutes);
        return (
          <article className="menu-item" key={service.id}>
            <div className="menu-top">
              <h3 className="menu-name">{service.name}</h3>
              <p className="menu-meta">
                {[price, duration].filter(Boolean).join(" · ") || "See Square for details"}
              </p>
            </div>
            {service.description ? <p className="quiet">{service.description}</p> : null}
            {service.variations.length > 1 ? (
              <ul className="quiet">
                {service.variations.map((variation) => (
                  <li key={variation.id}>
                    {variation.name}
                    {variation.price ? ` · ${variation.price.formatted}` : ""}
                    {variation.durationMinutes ? ` · ${formatDuration(variation.durationMinutes)}` : ""}
                  </li>
                ))}
              </ul>
            ) : null}
            <p>
              <a href={publicConfig.square.bookingUrl}>Book this in Square</a>
            </p>
          </article>
        );
      })}
    </div>
  );
}
