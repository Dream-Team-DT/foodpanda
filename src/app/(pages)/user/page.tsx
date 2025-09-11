"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IUser } from "@/types";
import Setting from "./_components/Setting";
import WishList from "./_components/WishList";
import Orders from "./_components/Orders";
import { Pen } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session, update } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchUser = async () => {
      const res = await fetch(`/api/users/${session.user?.id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, [session?.user?.id]);

  if (!user) {
    return <p className="text-center py-10">Loading user data...</p>;
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      await update();
      setUser((prev): IUser | null =>
        prev ? { ...prev, avatar: data.avatar as string } : prev
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="flex items-center gap-6 p-6 mb-6">
        <div className="w-24 h-24 relative">
          <Image
            width={300}
            height={300}
            priority
            src={
              preview || user.avatar || session?.user?.image || "/pandaface.svg"
            }
            alt="User Avatar"
            className="size-full rounded-full border"
          />
          <label htmlFor="avatar-upload">
            <Pen className="absolute bottom-0 right-0 bg-secondary/35 text-primary border border-primary p-[3px] rounded-sm size-6 cursor-pointer" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabsList className="w-full md:w-fit">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="wishlist" className="hidden sm:block">
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Info */}
        <TabsContent value="profile">
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-xl font-bold mb-3">Profile Information</h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {`+88 ${user.phone ? user.phone : ""}`}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders">
          <Orders />
        </TabsContent>

        {/* Wishlist */}
        <TabsContent value="wishlist">
          <WishList />
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <Setting user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
