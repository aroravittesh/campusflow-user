import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const payload = await req.json();
  const rawHeaders = headers(); // ✅ this is already ReadonlyHeaders, no Promise

  // Convert Next.js ReadonlyHeaders to plain object
  const headerPayload: Record<string, string> = {};
  for (const [key, value] of rawHeaders.entries()) {
    headerPayload[key] = value;
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), headerPayload);
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
