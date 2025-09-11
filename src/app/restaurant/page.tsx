"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IRestaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  Store,
  UtensilsCrossed,
} from "lucide-react";

// ---------- Types ----------
interface QuickStat {
  label: string;
  value: string | number;
  icon: JSX.Element;
}

const quickStats: QuickStat[] = [
  {
    label: "আজকের অর্ডার",
    value: 34,
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  { label: "আজকের আয়", value: "৳18,420", icon: <Store className="h-4 w-4" /> },
  {
    label: "একটিভ আইটেম",
    value: 96,
    icon: <UtensilsCrossed className="h-4 w-4" />,
  },
  { label: "রেটিং", value: "4.7", icon: <Star className="h-4 w-4" /> },
];

export default function RestaurantOwnerPage() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.restaurantId) return;

    const fetchRestaurant = async () => {
      const res = await fetch(`/api/restaurants/${session.user?.restaurantId}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurant(data);
      }
    };

    fetchRestaurant();
  }, [session?.user?.restaurantId]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border">
        <div className="relative h-48 sm:h-64 md:h-72">
          {/* Banner image (replace bg url or use next/image) */}
          <div
            style={{
              backgroundImage: `url(${restaurant?.banner || ""})`,
            }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        </div>
        <div className="p-4 sm:p-6 md:p-8 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="h-24 w-24 ring-4 ring-background shadow-xl">
              <Image
                width={300}
                height={300}
                id="AvatarImage"
                src={restaurant?.logo || "/pandaface.svg"}
                alt="Restaurant Logo"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {restaurant?.title}
                </h1>
                <Badge
                  className={`rounded-full text-[11px] ${
                    restaurant?.isVerified
                      ? "text-green-600 bg-green-500/25"
                      : "text-destructive bg-destructive/25"
                  }`}
                >
                  {
                    restaurant?.isVerified
                      ? "Verified"
                      : "unauthorized"
                  }
                  {/* Verified */}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {restaurant?.slogan} — Dhaka`s favorite comfort foods.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {restaurant?.address}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {restaurant?.phone}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4" /> 4.7 (1.9k)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="rounded-xl">
                <Store className="h-4 w-4 mr-2" /> View Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((s) => (
          <Card key={s.label} className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <h3 className="text-2xl font-semibold mt-1">{s.value}</h3>
                </div>
                <div className="p-2 rounded-xl bg-muted/60">{s.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Content */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Manage</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
