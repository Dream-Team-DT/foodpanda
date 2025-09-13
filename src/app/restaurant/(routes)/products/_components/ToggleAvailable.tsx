"use client";

import { Switch } from "@/components/ui/switch";
import { IProduct } from "@/types";
import { Loader } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface ToggleAvailableProps {
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  product: IProduct;
}

const ToggleAvailable: React.FC<ToggleAvailableProps> = ({
  product,
  setProducts,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleIsAvilable = async (_id: string, checked: boolean) => {
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
  return (
    <div className="flex justify-between items-center">
      <p>is Available</p>
      {loading ? (
        <Loader className="animate-spin text-secondary" />
      ) : (
        <Switch
          checked={product.isAvailable}
          onCheckedChange={(checked) => handleIsAvilable(product._id, checked)}
        />
      )}
    </div>
  );
};

export default ToggleAvailable;
