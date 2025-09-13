"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { IProduct } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductUpdateProps {
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  oldData: IProduct;
}

const ProductUpdate: React.FC<ProductUpdateProps> = ({
  oldData,
  setProducts,
}) => {
  const [formState, setFormState] = useState({
    name: oldData.name,
    price: oldData.price,
    category: oldData.category,
    description: oldData.description,
    image: oldData.image,
  });

  const [isChanged, setIsChanged] = useState(false);

  // Check if any input has changed
  useEffect(() => {
    const changed =
      formState.name !== oldData.name ||
      formState.price !== oldData.price ||
      formState.category !== oldData.category ||
      formState.description !== oldData.description ||
      formState.image !== oldData.image;

    setIsChanged(changed);
  }, [formState, oldData, oldData.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    _id: string,
    oldImage: string
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const imageFile = formData.get("image") as File;
    let imageUrl = oldImage;

    if (imageFile && imageFile.size > 0) {
      const imgData = new FormData();
      imgData.append("file", imageFile);
      const uploadRes = await fetch("/api/cloudinaryUpload", {
        method: "POST",
        body: imgData,
      });
      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.result.secure_url;
    }

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      image: imageUrl,
    };

    try {
      const res = await fetch(`/api/products/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const update = await res.json();

      if (update.success) {
        setProducts((prev: IProduct[]) =>
          prev.map((p) => (p._id === _id ? update.product : p))
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
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
        <form
          onSubmit={(e) => handleUpdate(e, oldData._id, oldData.image)}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              defaultValue={oldData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={oldData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={oldData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={oldData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={!isChanged}
            className={`px-4 py-2 rounded text-white ${
              isChanged
                ? "bg-secondary hover:bg-primary"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUpdate;
