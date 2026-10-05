import Link from "next/link";
import { formattedAddress, hasLocalBusinessAddress, publicConfig, site, telHref } from "@/lib/config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="wordmark" style={{ margin: 0 }}>
            {site.name}
          </p>
          <p>Appointments, payments, invoices, and reminders stay in Square. This site is the front door.</p>
        </div>
        <div>
          <p>
            <Link href="/book">Book an appointment</Link>
          </p>
          <p>
            <Link href="/events">Plan an event</Link>
          </p>
          <p>
            <Link href="/invoices">Pay an invoice</Link>
          </p>
          <p>
            <Link href="/account">Manage your appointment</Link>
          </p>
          <p>
            <Link href="/gift-cards">Gift cards</Link>
          </p>
        </div>
        <div>
          {hasLocalBusinessAddress() ? <p>{formattedAddress()}</p> : null}
          {publicConfig.phone ? (
            <p>
              <a href={telHref()}>{publicConfig.phone}</a>
            </p>
          ) : null}
          {publicConfig.email ? (
            <p>
              <a href={`mailto:${publicConfig.email}`}>{publicConfig.email}</a>
            </p>
          ) : (
            <p>
              <Link href="/contact">Write to Sydney</Link>
            </p>
          )}
          <p>
            <a href={publicConfig.square.onlineSiteUrl} rel="noreferrer" target="_blank">
              Square boutique
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
