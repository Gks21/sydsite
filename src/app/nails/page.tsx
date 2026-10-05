import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { ServiceMenu } from "@/components/ServiceMenu";
import { pageMeta } from "@/lib/seo";
import { getAppointmentServices, getRetailProducts, isLikelyNailService } from "@/lib/square";

export const metadata: Metadata = pageMeta(
  "Nail services",
  "Glamour nails at Sydney’s Beauty Lounge. Browse the live Square menu for names, prices, durations, and booking requirements.",
  "/nails",
);

export const revalidate = 3600;

export default async function NailsPage() {
  const services = await getAppointmentServices();
  const nailServices = services.filter(isLikelyNailService);
  const retail = await getRetailProducts();
  const nailRetail = retail.filter((item) => /cuticle|pedi/i.test(item.name));

  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Signature</p>
          <h1>Glamour at your fingertips.</h1>
          <p className="lede">
            Nails are the reason most people find the lounge — and the reason they return. Shape, art, and a finish that
            photographs like a second piece of jewelry.
          </p>
          <div className="cta-row">
            <Button href="/book">Book your nail appointment</Button>
            <Button href="/gallery" variant="ghost">
              See the look
            </Button>
          </div>
        </div>
        <div className="frame" style={{ position: "relative", minHeight: "26rem" }}>
          <Image src="/images/nail-art.jpg" alt="Espresso and gold nail art" fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="wrap" style={{ marginTop: "3rem" }}>
        <h2>From the Square menu</h2>
        <p className="price-note">
          Prices, durations, deposits, and cancellation rules are the ones attached to each Square service. If a nail
          service is not listed here yet, it still appears in booking.
        </p>
        <ServiceMenu
          services={nailServices.length ? nailServices : services}
          emptyLabel="Connect Square’s catalog to list nail services and prices here automatically. Until then, the live menu is inside booking."
        />
        {nailRetail.length ? (
          <div style={{ marginTop: "2.5rem" }}>
            <h3>Nail-side retail</h3>
            <div className="product-list">
              {nailRetail.map((item) => (
                <a className="product" href={item.squareUrl} key={item.id} rel="noreferrer" target="_blank">
                  <span>{item.name}</span>
                  <span>{item.price.formatted}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
