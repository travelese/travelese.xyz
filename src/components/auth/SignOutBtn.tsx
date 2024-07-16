"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignOutBtn() {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }
  };
  return (
    <Button onClick={handleSignOut} className="w-full text-left">
      Sign out
    </Button>
  );
}
