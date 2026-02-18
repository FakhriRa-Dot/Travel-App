import NavbarUser from "@/components/navbar/NavbarUser";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarUser />
      {children}
    </>
  );
}
