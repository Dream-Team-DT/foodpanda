"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { IRestaurant } from "@/types";
import { useSession } from "next-auth/react";

const Settings = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  // formData আলাদা state
  const [formData, setFormData] = useState({
    title: "",
    slogan: "",
    phone: "",
    address: "",
    banner: "",
    logo: "",
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // fetch restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/restaurants/${session?.user?.restaurantId}`
        );
        if (!res.ok) throw new Error("Failed to fetch restaurant");
        const data = await res.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load restaurant data");
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.restaurantId) {
      fetchRestaurant();
    }
  }, [session?.user?.restaurantId]);

  // যখন restaurant আসবে, formData update করো
  useEffect(() => {
    if (restaurant) {
      setFormData({
        title: restaurant.title || "",
        slogan: restaurant.slogan || "",
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        banner: restaurant.banner || "",
        logo: restaurant.logo || "",
      });
    }
  }, [restaurant]);

  // file handle
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBannerFile(e.target.files[0]);
    }
  };

  // input handle
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // update
  const handleUpdate = async () => {
    try {
      setLoading(true);

      let bannerUrl = formData.banner;
      let logoUrl = formData.logo;

      // upload banner
      if (bannerFile) {
        const data = new FormData();
        data.append("file", bannerFile);
        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: data,
        });
        const upload = await res.json();
        bannerUrl = upload.secure_url;
      }

      // upload logo
      if (logoFile) {
        const data = new FormData();
        data.append("file", logoFile);
        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: data,
        });
        const upload = await res.json();
        logoUrl = upload.secure_url;
      }

      const res = await fetch(
        `/api/restaurants/${session?.user?.restaurantId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            banner: bannerUrl,
            logo: logoUrl,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update restaurant");

      toast.success("Restaurant updated successfully!");
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update restaurant!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !restaurant) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <form>
      {/* banner */}
      <div className="overflow-hidden rounded-2xl border">
        <div className="relative h-48 sm:h-64 md:h-72">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${formData.banner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        </div>

        <div className="p-4 sm:p-6 md:p-8 -mt-16 relative">
          <div className="relative h-24 w-24 ring-4 ring-background shadow-xl">
            <Image
              width={500}
              height={500}
              src={formData.logo || "/default-logo.png"}
              alt="Restaurant Logo"
              className="rounded-md object-cover"
            />
            <label htmlFor="logo-upload">
              <Pen className="absolute -bottom-3 -right-3 bg-secondary/35 text-primary border border-primary p-[3px] rounded-sm size-6 cursor-pointer" />
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="space-y-4">
          <div>
            <label htmlFor="name">Restaurant title</label>
            <Input type="text" id="name" name="name" defaultValue={""} />
          </div>
          <div>
            <label htmlFor="name">Slogan</label>
            <Input type="text" id="name" name="name" defaultValue={""} />
          </div>
          <div>
            <label htmlFor="name">Restaurant title</label>
            <Input type="text" id="name" name="name" defaultValue={""} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Restaurant title</label>
          <Textarea id="description" name="description" defaultValue={""} />
        </div>
      </div>
    </form>
  );
};

export default Settings;
