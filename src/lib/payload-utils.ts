import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

// payload utils is used to extract the user details from the token
// the token name is the payload token , I can get that insdie the cookies section in the inspect
export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;

  // cache fetch with the authorization header stack over flow
  // this is a serverside fetch provided by the next js, it also extends the native fetch api
  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  const { user } = (await meRes.json()) as {
    user: User | null;
  };

  return { user };
};
