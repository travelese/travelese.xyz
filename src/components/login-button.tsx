"use client"

import { Button } from "@/components/ui/button";
import { handleGithubLogin, handleGoogleLogin, handleLogout } from "@/lib/action";

const LoginButtonGithub = () => {
    return (
      <Button
        className="w-full"
        variant="outline"
        onClick={() => handleGithubLogin()}
      >
        Login with Github
      </Button>
    );
}

const LoginButtonGoogle = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => handleGoogleLogin()}
    >
      Login with Google
    </Button>
  );
}

const LogoutButton = () => {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => handleLogout()}
    >
      Logout
    </Button>
  );
}
              
export { LoginButtonGithub, LoginButtonGoogle, LogoutButton };