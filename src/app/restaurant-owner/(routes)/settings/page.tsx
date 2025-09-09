import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";

const Settings = () => {
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-2xl border">
        <div className="relative h-48 sm:h-64 md:h-72">
          {/* Banner image (replace bg url or use next/image) */}
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        </div>
        <div className="p-4 sm:p-6 md:p-8 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div
              id="avatar"
              className="h-24 w-24 ring-4 ring-background shadow-xl"
            >
              <Image
                width={500}
                height={500}
                id="AvatarImage"
                src="https://images.deliveryhero.io/image/fd-bd/campaign-assets/02e77d64-5036-11f0-a83e-0657f0b942b8/desktop_tile_EnigiJ.png"
                alt="Restaurant Logo"
              />
              {/* <AvatarFallback>RM</AvatarFallback> */}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  RannaBari Restaurant
                </h1>
                <div id="Badge" className="rounded-full">
                  Verified
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {'"'}Fresh • Fast • Halal{'"'} — Dhaka`s favorite comfort foods.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Mirpur, Dhaka
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-4 w-4" /> 01312-000000
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4" /> 4.7 (1.9k)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Restaurant Name</label>
          <Input defaultValue="RannaBari Restaurant" />
          <label className="text-sm font-medium">Slogan</label>
          <Input defaultValue="Fresh • Fast • Halal" />
          <label className="text-sm font-medium">Phone</label>
          <Input defaultValue="01312-000000" />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium">Address</label>
          <Textarea defaultValue="House 11, Road 4, Mirpur, Dhaka" />
          <label className="text-sm font-medium">Banner Image URL</label>
          <Input placeholder="https://..." />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="rounded-xl">Update</Button>
        <Button variant="outline" className="rounded-xl">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Settings;
