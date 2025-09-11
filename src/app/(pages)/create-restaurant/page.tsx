"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateRestaurant = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId) {
      setLoading(false);
      setMessage("User ID missing");
      return;
    }

    const formData = new FormData(e.currentTarget);

    try {
      let bannerUrl = "";

      if (banner) {
        const uploadForm = new FormData();
        uploadForm.append("file", banner);

        const uploadRes = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success) bannerUrl = uploadData.result.secure_url;
        else throw new Error("Banner upload failed in cloud");
      }

      const data = {
        userId,
        title: formData.get("title"),
        slogan: formData.get("slogan"),
        banner: bannerUrl,
        address: formData.get("address"),
        phone: formData.get("phone"),
        country: formData.get("country"),
      };

      const res = await fetch("/api/restaurants/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        await update();
        router.push("/restaurant");
      } else setMessage("Failed: " + result.message);
    } catch (error) {
      if (error instanceof Error) setMessage(`Error: ${error.message}`);
      else setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-3 md:p-6 bg-gray-900 text-white rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Build Restaurant</h2>
        <div className="h-30 bg-gray-100/25 rounded-xl border-2 border-dashed border-gray-400 overflow-hidden flex justify-center items-center">
          <Image
            src={preview || "/demoimage.svg"}
            width={500}
            height={300}
            alt="Banner"
            className={preview ? "w-full h-full" : "w-12"}
          />
        </div>

        <input
          type="text"
          name="title"
          placeholder="Restaurant Name"
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="slogan"
          placeholder="Slogan (optional)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
        <div>
          <input
            type="file"
            id="banner"
            accept="image/*"
            name="Banner"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="w-22 px-1.5 p-1 bg-amber-300 text-black font-medium rounded text-xs cursor-pointer"
          >
            Select file
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
        {message && (
          <p className="text-center text-sm mt-2 text-destructive">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateRestaurant;
