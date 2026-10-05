import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { publicConfig, site } from "@/lib/config";
import { serverConfig } from "@/lib/server-config";
import { createSquareCustomer } from "@/lib/square/customers";
import { formatInquiryMessage, type EventInquiryInput } from "@/lib/inquiries";

const STORE = path.join(process.cwd(), "data", "inquiries.json");

async function storeInquiry(inquiry: EventInquiryInput) {
  await mkdir(path.dirname(STORE), { recursive: true });
  let existing: EventInquiryInput[] = [];
  try {
    existing = JSON.parse(await readFile(STORE, "utf8")) as EventInquiryInput[];
  } catch {
    existing = [];
  }
  existing.push({ ...inquiry });
  await writeFile(STORE, JSON.stringify(existing, null, 2));
}

export async function deliverInquiry(inquiry: EventInquiryInput) {
  await storeInquiry(inquiry);

  let emailed = false;
  if (serverConfig.inquiry.resendApiKey && serverConfig.inquiry.toEmail) {
    const resend = new Resend(serverConfig.inquiry.resendApiKey);
    const subject =
      inquiry.kind === "contact"
        ? `Website inquiry from ${inquiry.name}`
        : `Event inquiry from ${inquiry.name}`;
    const { error } = await resend.emails.send({
      from: serverConfig.inquiry.fromEmail,
      to: [serverConfig.inquiry.toEmail],
      replyTo: inquiry.email,
      subject: `${subject} · ${site.name}`,
      text: formatInquiryMessage(inquiry),
    });
    if (error) {
      console.error("Resend delivery failed", error);
    } else {
      emailed = true;
    }
  }

  try {
    const [givenName, ...rest] = inquiry.name.split(" ");
    await createSquareCustomer({
      givenName,
      familyName: rest.join(" ") || undefined,
      emailAddress: inquiry.email,
      phoneNumber: inquiry.phone,
      note: `Website ${inquiry.kind ?? "event"} inquiry. ${formatInquiryMessage(inquiry)}`,
    });
  } catch (error) {
    console.error("Square customer sync skipped", error);
  }

  return {
    emailed,
    stored: true,
    squareConfigured: Boolean(serverConfig.square.accessToken),
    notifyEmail: serverConfig.inquiry.toEmail || publicConfig.email,
  };
}
