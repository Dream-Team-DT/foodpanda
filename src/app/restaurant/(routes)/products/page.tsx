"use client";

import { IProduct } from "@/types";
import { EllipsisVertical, Loader, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.restaurantId) return;

    const fetchProducts = async () => {
      const res = await fetch(`/api/products/${session.user?.restaurantId}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    };

    fetchProducts();
  }, [session?.user?.restaurantId]);

  const handleAvilable = async (_id: string, checked: boolean) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: checked }),
      });

      if (res.ok) {
        setLoading(false);
        setProducts((prev) =>
          prev.map((p) => (p._id === _id ? { ...p, isAvailable: checked } : p))
        );
      } else {
        console.error("Failed to update availability");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return products.length === 0 ? (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center">
<h2 className="text-5xl font-bold text-gray-400">Add Product First</h2>
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(
          ({ _id, name, description, image, price, isAvailable }) => (
            <Card
              key={_id}
              className={`relative rounded-2xl md:w-[20rem] 2xl:w-[23rem] gap-0 overflow-hidden p-0 ${
                !isAvailable && "order-last"
              }`}
            >
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="h-34 md:h-46 bg-cover bg-center"
              />
              <CardContent className="px-4 py-2 border-t">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                  <p className="mt-2 font-semibold">৳ {price}</p>
                </div>
              </CardContent>

              {/* Overlay */}
              <div
                className={`absolute size-full top-0 left-0 bg-black/75 flex justify-center items-center ${
                  isAvailable ? "hidden" : "block"
                }`}
              >
                <h2 className="text-4xl font-bold text-white">Not available</h2>
              </div>

              <Popover>
                <PopoverTrigger className="absolute text-white top-3 right-3 cursor-pointer">
                  <EllipsisVertical className="p-1.5 size-9 bg-black/25 rounded-full" />
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-neutral-800 text-accent border-0">
                  <ul className="space-y-1">
                    <li className="p-2 hover:bg-accent/10 rounded border-b border-gray-50/30 cursor-pointer  ">
                      <Dialog>
                        <DialogTrigger className="flex justify-between items-center w-full">
                          <p>Update</p>
                          <Pencil />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <div>
                            <h2>Edit content here</h2>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                    <li className="p-2 hover:bg-accent/10 rounded border-b border-gray-50/30 cursor-pointer flex justify-between items-center">
                      <p>is Available</p>
                      {loading ? (
                        <Loader className="animate-spin text-secondary" />
                      ) : (
                        <Switch
                          checked={isAvailable}
                          onCheckedChange={(checked) =>
                            handleAvilable(_id, checked)
                          }
                        />
                      )}
                    </li>
                    <li className="p-2 rounded border-b border-gray-50/30 cursor-pointer bg-destructive/15 hover:bg-destructive/25 text-destructive">
                      <Dialog>
                        <DialogTrigger className="flex justify-between items-center w-full">
                          <p className="font-medium">Delete</p>
                          <Trash2 />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <div>
                            <h2>Delete content here</h2>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
