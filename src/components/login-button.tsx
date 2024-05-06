"use client"

import { Button } from "@/components/ui/button";
import { handleGithubLogin, handleGoogleLogin, handleLogout } from "@/lib/action";

export function LoginButtonGithub() {
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


export function LoginButtonGoogle() {
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

export function LogoutButton() {
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
                