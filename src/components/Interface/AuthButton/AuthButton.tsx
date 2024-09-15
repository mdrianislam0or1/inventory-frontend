import { authKey } from "@/constants/authKey";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { getUserInfo, removeUser } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser(); // Remove user info
    deleteCookies(authKey); // Delete auth cookies
    router.push("/"); // Redirect to homepage
    router.refresh(); // Refresh the page
  };

  return (
    <>
      {userInfo?.email ? (
        <button
          onClick={handleLogout}
          className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      ) : (
        <Link href="/login">
          <button className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium">
            Sign in
          </button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
