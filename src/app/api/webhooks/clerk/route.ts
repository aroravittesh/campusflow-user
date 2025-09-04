import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Define the Clerk event type (simplified for user.created)
interface ClerkUserCreatedEvent {
  type: "user.created";
  data: {
    id: string;
    email_addresses: { email_address: string }[];
  };
}

export async function POST(req: Request) {
  const payload = await req.json();

  // Await headers() and convert to plain object
  const rawHeaders = await headers();
  const headerPayload: Record<string, string> = {};
  rawHeaders.forEach((value, key) => {
    headerPayload[key] = value;
  });

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  let evt: ClerkUserCreatedEvent;
  try {
    evt = wh.verify(JSON.stringify(payload), headerPayload) as ClerkUserCreatedEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const { id, email_addresses } = evt.data;

    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address,
        },
      });
      console.log("✅ User inserted into DB:", id);
    } catch (e) {
      console.error("❌ Prisma insert failed:", e);
    }
  }

  return new Response("ok", { status: 200 });
}
