"use client";

import { IProduct } from "@/types";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
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

  console.log(products);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(
          ({ _id, name, description, image, price, isAvailable }) => (
            <Card
              key={_id}
              className={`relative rounded-2xl w-[23rem] gap-0 overflow-hidden p-0 ${
                !isAvailable && "order-last"
              }`}
            >
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="h-46 bg-cover bg-center"
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
                className={`absolute size-full top-0 left-0 bg-black/55 ${
                  isAvailable ? "hidden" : "block"
                }`}
              ></div>

              <Popover>
                <PopoverTrigger className="absolute text-white top-3 right-3 cursor-pointer">
                  <EllipsisVertical />
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
                      <Switch checked={isAvailable} />
                    </li>
                    <li className="p-2 rounded border-b border-gray-50/30 cursor-pointer bg-destructive/25 hover:bg-destructive/30 text-destructive">
                      <Dialog>
                        <DialogTrigger className="flex justify-between items-center w-full">
                          <p>Delete</p>
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
