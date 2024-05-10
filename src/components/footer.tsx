import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 shadow border-t">
      <Link
        className="text-xs"
        href="https://arminbabaeistudio.com"
      >
        © 2024 Armin Babaei Studio. All rights reserved.
      </Link>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </div>
  );
}
