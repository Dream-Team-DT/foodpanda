import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserContentForMobile from "@/app/(pages)/_components/shared/navbar/_components/UserContentForMobile";
import Logo from "@/components/ui/Logo";
import UserContent from "@/app/(pages)/_components/shared/navbar/_components/UserContent";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-xl px-3 z-50">
      <div className="container mx-auto flex justify-between items-center py-3.5 md:py-5">
        {/* UserContent for small screen */}
        <UserContentForMobile />

        {/* Site Logo */}
        <Logo />

        <div className="flex items-center gap-2 md:gap-7">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="size-6" />
          </Button>

          {/* Login/Logout, Language, Cart etc sections */}
          <UserContent />
        </div>
      </div>
    </header>
  );
}
