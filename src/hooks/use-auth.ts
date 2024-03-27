// this the auth hook used to handle the siggn in trigger
// it is used in the navbar; it says when the user is already signed in show the sign out button
//
//
//the router.refresh is necessary to properly sync the things
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      // this api end point is provided by the cms; which invalidated token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Signed out successfully");

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast.error("Couldn't sign out, please try again.");
    }
  };

  return { signOut };
};
