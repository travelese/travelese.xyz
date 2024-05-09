import SideNav from "@/components/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <SideNav />
      {children}
    </div>
  );
}
