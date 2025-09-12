"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(({ _id, name, description, image, price }) => (
          <Card key={_id} className="rounded-2xl gap-0 overflow-hidden p-0">
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="h-50 bg-cover bg-center bg-amber-300"
            />
            <CardContent className="p-4 border-t">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
                <p className="mt-2 font-semibold">৳ {price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
