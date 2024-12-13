import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// after making the api key install the nodemailer and use the resend
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// the 'payload' is comming from the payload and is catched to reduce the number of cost;(un necessasy cost)
// the payload is comming from the cms and it is the whole window client thing so it needs to be cached;
// if there is not something globally cached pass there is no client and there is also no promise
let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

// getPayloadClient returns a type of payload other wise it will return a any type and ts will not work
export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  // the type <Payload> is comming from the payload; to check this go to definition
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    // the email is also a property of the PAYLOAD cms ;
    // it says when  the paylaod is first time initialized send the email to verify
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "contacts@medhashismaiti.com",
        fromName: "DigitalHippo",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
