import { NextResponse } from "next/server";
import { z } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const contactSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(200),
  company: z.string().max(200).optional(),
  message: z.string().trim().max(1000).optional().nullable(),
  phone_number: z
    .string()
    .trim()
    .max(15, "Please enter a valid phonenumber.")
    .optional()
    .nullable(),
  token: z.string().min(1, "Please complete the reCAPTCHA"),
});

export type ContactRequest = z.infer<typeof contactSchema>;

export async function POST(req: Request) {
  try {
    const body: ContactRequest = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    const { name, email, company, message, phone_number, token } = parsed.data;

    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: token,
        }),
      },
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    const now = new Date();

    await addDoc(collection(db, "contacts"), {
      name,
      email,
      company: company || null,
      message: message || null,
      phone_number: phone_number || null,
      token: token,
      createdAt: serverTimestamp(),
      createdDate: now.toISOString().split("T")[0],
      createdTime: now.toTimeString().split(" ")[0],
    });

    return NextResponse.json(
      { message: "Form submitted & email sent" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Email failed:", err);
    return NextResponse.json(
      { error: "Mail sending failed after retries" },
      { status: 500 },
    );
  }
}
