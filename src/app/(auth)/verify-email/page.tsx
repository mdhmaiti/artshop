// after clicking the verify button in the email the users comes in this page
import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

// this is the type of the search params
// in the past i used the string everytime lol
// note the search params is a special key word
//
//
// this is the way of receiving the serverside searchParams
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  // it takes the token from the search params/ search bar to verify the mail
  // email?token = something
  const token = searchParams.token;
  // email?to = address
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* if there is a token and the token is a string then render a different component  */}
        to verify the email pass the token as a prop in the email component
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="hippo email sent image"
              />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            {/* indication that the verification link is sent */}
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
