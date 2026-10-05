import Image from "next/image";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { serviceStories } from "@/content/stories";
import { site } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Boutique beauty</p>
            <h1>{site.name}</h1>
            <p className="lede" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--espresso)", lineHeight: 1.2 }}>
              {site.tagline}
            </p>
            <p className="lede">
              Glamour nails at the center, with cosmetics, beauty services, and private gatherings around them. Book
              through Sydney’s Square scheduler — the same place that holds her calendar, your profile, and payment.
            </p>
            <div className="hero-actions">
              <Button href="/book">Book an Appointment</Button>
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </div>
          </div>
          <Photo
            className="hero-media"
            src="/images/hero-nails.jpg"
            alt="Close-up of glamorous champagne and blush nails"
            caption="Signature nails"
            sizes="(max-width: 720px) 100vw, 55vw"
            priority
          />
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Signature nails</p>
            <h2>Glamour at your fingertips.</h2>
            <p>
              This is the work people come back for: considered shapes, a high-glam finish, and the quiet luxury of an
              appointment that is actually about you.
            </p>
            <p className="price-note">
              Service names, durations, and prices are the ones Sydney maintains in Square. Nothing here is a second
              menu.
            </p>
            <div className="cta-row">
              <Button href="/nails">See nail services</Button>
              <Button href="/book" variant="ghost">
                Book your nail appointment
              </Button>
            </div>
          </div>
          <div className="frame" style={{ position: "relative", minHeight: "28rem" }}>
            <Image
              src="/images/nails-silk.jpg"
              alt="Glazed nude nails on cream silk"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-intro">
            <p className="eyebrow">More than nails</p>
            <h2>Beauty, cosmetics, and the rest of the glam.</h2>
            <p>
              Come for nails. Stay because the lounge also holds makeup, beauty appointments, and the little things that
              make a look feel finished.
            </p>
          </div>
          <div className="story-stack">
            {serviceStories.map((story, index) => (
              <article className={`story${index === 1 ? " reverse" : ""}`} key={story.id}>
                <div className="frame" style={{ position: "relative", minHeight: "22rem" }}>
                  <Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <p className="eyebrow">{story.eyebrow}</p>
                  <h3>{story.title}</h3>
                  <p>{story.copy}</p>
                  <div className="cta-row">
                    <Button href={story.href} variant={story.id === "events" ? "secondary" : "primary"}>
                      {story.cta}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Events</p>
            <h2>Make it a beauty event.</h2>
            <p>
              A birthday, a bridal morning, a girls’ night, a private nail gathering — if it should feel special, start
              with an inquiry. Sydney will shape the experience, then use Square for invoicing and payment when it’s
              confirmed.
            </p>
            <div className="cta-row">
              <Button href="/events">Plan an Event</Button>
            </div>
          </div>
          <div className="frame" style={{ position: "relative", minHeight: "22rem" }}>
            <Image
              src="/images/events-table.jpg"
              alt="Candlelit table set for a private beauty gathering"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-intro">
            <p className="eyebrow">Gallery</p>
            <h2>The mood of the lounge.</h2>
            <p>Nails first, then makeup, beauty, and the glow of a private event.</p>
          </div>
          <div className="cta-row">
            <Button href="/gallery" variant="secondary">
              Open the gallery
            </Button>
            <Button href="/about" variant="ghost">
              Meet Sydney
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
