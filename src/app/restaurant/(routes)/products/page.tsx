"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IProduct } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProductUpdate from "./_components/ProductUpdate";
import ToggleAvailable from "./_components/ToggleAvailable";
import ProductDelete from "./_components/ProductDelete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  return products.length === 0 ? (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center">
      <h2 className="text-5xl font-bold text-gray-400/50">Add Product First</h2>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product._id}
          className={`relative rounded-2xl md:w-[20rem] 2xl:w-[23rem] gap-0 overflow-hidden p-0 ${
            !product.isAvailable && "order-last"
          }`}
        >
          <div
            style={{ backgroundImage: `url(${product.image})` }}
            className="h-34 md:h-46 bg-cover bg-center"
          />
          <CardContent className="px-4 py-2 border-t">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-2 font-semibold">৳ {product.price}</p>
            </div>
          </CardContent>

          {/* Overlay */}
          <div
            className={`absolute size-full top-0 left-0 bg-black/75 flex justify-center items-center ${
              product.isAvailable ? "hidden" : "block"
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
                  <ProductUpdate oldData={product} setProducts={setProducts} />
                </li>
                <li className="p-2 hover:bg-accent/10 rounded border-b border-gray-50/30 cursor-pointer">
                  <ToggleAvailable
                    product={product}
                    setProducts={setProducts}
                  />
                </li>
                <li className="p-2 rounded border-b border-gray-50/30 cursor-pointer bg-destructive/15 hover:bg-destructive/25 text-destructive">
                  <ProductDelete product={product} setProducts={setProducts} />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </Card>
      ))}
    </div>
  );
};

export default Products;
