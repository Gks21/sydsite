import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { ServiceMenu } from "@/components/ServiceMenu";
import { getAppointmentServices, getRetailProducts, groupServicesByCategory } from "@/lib/square";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Services",
  "Nail services, beauty appointments, makeup, and cosmetics at Sydney’s Beauty Lounge. Live prices and availability stay in Square.",
  "/services",
);

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getAppointmentServices();
  const grouped = groupServicesByCategory(services);
  const retail = await getRetailProducts();

  return (
    <>
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">The full lounge</p>
            <h1>Nails, beauty, and the finishing touches.</h1>
            <p className="lede">
              Glamour nails lead, but they are not the only invitation. Beauty appointments and cosmetics live in the
              same Square account Sydney uses every day.
            </p>
            <div className="cta-row">
              <Button href="/book">Get your glam on</Button>
              <Button href="/nails" variant="secondary">
                Start with nails
              </Button>
            </div>
          </div>
          <div className="frame" style={{ position: "relative", minHeight: "24rem" }}>
            <Image
              src="/images/cosmetics-still.jpg"
              alt="Blush, powder, and champagne makeup brushes"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <h2>Appointment services</h2>
          <p className="price-note">
            Names, descriptions, prices, durations, and booking requirements come from Square. This website does not keep
            a second price list.
          </p>
          {services.length ? (
            [...grouped.entries()].map(([category, list]) => (
              <div key={category} style={{ marginTop: "2rem" }}>
                <h3>{category}</h3>
                <ServiceMenu services={list} />
              </div>
            ))
          ) : (
            <ServiceMenu services={[]} />
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Cosmetics & take-home</p>
            <h3>From the Square boutique</h3>
            <p>
              These are the retail items currently published on Sydney’s Square site. Checkout stays with Square, including
              Apple Pay and Google Pay where she has them enabled.
            </p>
          </div>
          <div className="product-list">
            {retail.map((item) => (
              <a className="product" href={item.squareUrl} key={item.id} rel="noreferrer" target="_blank">
                <span>{item.name}</span>
                <strong>{item.price.formatted}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
