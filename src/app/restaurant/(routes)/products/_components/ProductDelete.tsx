import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

interface ProductDeleteProps {
  product: IProduct;
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

const ProductDelete: React.FC<ProductDeleteProps> = ({
  product,
  setProducts,
}) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      // State update
      setProducts((prev) => prev.filter((p) => p._id !== product._id));

      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Product not deleted!");
      console.error("Error:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex justify-between items-center w-full">
        <p className="font-medium">Delete</p>
        <Trash2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your Item
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Card className={`rounded-2xl gap-0 overflow-hidden p-0`}>
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
        </Card>
        <div>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="w-full cursor-pointer mt-2"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDelete;
