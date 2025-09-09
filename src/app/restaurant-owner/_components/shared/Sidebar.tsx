"use client";

import {
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sideItems = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Dashboard",
    href: "/restaurant-owner",
  },
  {
    icon: <UtensilsCrossed className="h-5 w-5" />,
    label: "Products",
    href: "/restaurant-owner/products",
  },
  {
    icon: <PlusCircle className="h-5 w-5" />,
    label: "Add Product",
    href: "/restaurant-owner/add-product",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    label: "Orders",
    href: "/restaurant-owner/orders",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/restaurant-owner/settings",
  },
  {
    icon: <LogOut className="h-5 w-5" />,
    label: "Exit from Restaurant",
    href: "/",
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // current route

  return (
    <aside className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight">Owner Panel</h2>
        <p className="text-xs text-muted-foreground">Manage your restaurant</p>
      </div>

      <ul>
        {sideItems.map((sideItem, idx) => {
          const isActive = pathname === sideItem.href; // check active
          return (
            <Link key={idx} href={sideItem.href}>
              <li
                className={`p-3.5 rounded-lg mb-1 flex items-center gap-3 cursor-pointer 
                ${
                  isActive
                    ? "bg-secondary/20 text-primary font-medium"
                    : "hover:bg-secondary/20"
                }`}
              >
                {sideItem.icon}
                <p>{sideItem.label}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
