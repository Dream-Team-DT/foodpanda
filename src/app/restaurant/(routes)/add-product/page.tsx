"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();

  const restaurantId = session?.user?.restaurantId;

  const formRef = useRef<HTMLFormElement>(null);

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!restaurantId) {
      setLoading(false);
      setMessage("Restautant ID missing");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (!imageFile) {
      alert("Please select an image first!");
      return;
    }

    try {
      let imageUrl = "";

      // Cloudinary upload
      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", imageFile);

        const uploadRes = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success && uploadData.result?.secure_url) {
          imageUrl = uploadData.result.secure_url;
        } else {
          throw new Error("Image upload failed in cloud");
        }
      }

      const data = {
        restaurantId,
        name: formData.get("name"),
        description: formData.get("description"),
        image: imageUrl,
        price: formData.get("price"),
        category: formData.get("category"),
      };

      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        formRef.current?.reset();
        setImageFile(null);
        setPreview(null);
      } else setMessage("Failed: " + result.message);
    } catch (error) {
      if (error instanceof Error) setMessage(`Error: ${error.message}`);
      else setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <Input placeholder="e.g., Chicken Biryani" name="name" required />
          </div>
          <div>
            <label className="text-sm font-medium">Price (৳)</label>
            <Input
              type="number"
              placeholder="e.g., 220"
              name="price"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <Input placeholder="e.g., Rice" name="category" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Short Description (optional)
            </label>
            <Textarea
              rows={5}
              placeholder="Ingredients, serving info, etc."
              name="description"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Product Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handlePreviewChange}
            />
            {preview && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="rounded-lg px-6 py-2 bg-secondary hover:bg-primary cursor-pointer"
        >
          {loading ? "Creating..." : "Add Product"}
        </Button>
        {message && (
          <p className="text-center text-sm mt-2 text-destructive">{message}</p>
        )}
      </div>
    </form>
  );
};

export default AddProduct;
