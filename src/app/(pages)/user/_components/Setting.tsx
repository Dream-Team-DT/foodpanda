import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SettingProps {
  user: IUser;
}

const Setting: React.FC<SettingProps> = ({ user }) => {
  const [isChanged, setIsChanged] = useState(false);
  const { data: session, update } = useSession();

  const [formData, setFormData] = useState({
    ...user,
    birthday: user.birthday
      ? new Date(user.birthday).toISOString().split("T")[0]
      : "",
  });

  useEffect(() => {
    const hasChanges =
      formData.name !== user.name ||
      formData.phone !== user.phone ||
      formData.address !== user.address ||
      formData.birthday !==
        (user.birthday
          ? new Date(user.birthday).toISOString().split("T")[0]
          : "") ||
      formData.gender !== user.gender;
    setIsChanged(hasChanges);
  }, [formData, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update on Database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update");

      // const updatedUser = await res.json();
      await update();
      toast.success("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      toast.error("Update failed!" + err);
    }
  };

  // Delete Account
  const [delValue, setDelValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleDelBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDelValue(value);

    if (value === "I want to delete") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleDelete = async () => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      toast.success("Account deleted successfully!");

      signOut({ callbackUrl: "/" });
    } catch (err) {
      toast.error("Delete failed: " + err);
    }
  };

  return (
    <Card className="shadow-none border-none md:border md:shadow">
      <CardContent className="p-0 md:p-6 space-y-3">
        <h3 className="text-xl font-bold mb-3 text-center">Settings</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3.5 md:p-6 rounded-2xl shadow-md"
        >
          <p className="font-semibold mb-2">Profile info</p>
          <div className="md:grid md:grid-cols-2 gap-4 space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="rounded-xl text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <Input
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-xl text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Birthday
              </label>
              <Input
                type="date"
                name="birthday"
                value={formData.birthday || ""}
                onChange={handleChange}
                className="rounded-xl text-sm md:text-base"
              />
            </div>

            {/* Gender section */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex items-center space-x-6">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center space-x-2 text-sm md:text-base"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col col-start-1 col-end-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:text-base">
                Address
              </label>
              <Textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Address"
                className="rounded-xl text-sm md:text-base"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-5 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
            disabled={!isChanged}
          >
            Save Changes
          </Button>
          <Toaster position="top-center" richColors />
        </form>

        <form className="space-y-3 my-10 bg-white p-3.5 md:p-6 rounded-2xl shadow-md">
          <p className="font-semibold">Change Password</p>
          <Input name="password" placeholder="Old password" />
          <Input name="password" placeholder="New password" />
          <Button type="submit" className="w-full">
            Change password
          </Button>
        </form>

        <div className="p-4 md:p-7 bg-red-600/25 rounded-lg border border-red-600">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full cursor-pointer h-10"
              >
                Delete Account
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <p className="text-sm">
                if you want to delele your account Type{" "}
                <span className="font-semibold">`I want to delete`</span> to
                confirm
              </p>
              <Input value={delValue} onChange={handleDelBtnChange} />
              <Button
                disabled={isDisabled}
                onClick={handleDelete}
                variant="destructive"
                className="w-full mt-4"
              >
                Yes, Delete My Account
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default Setting;
