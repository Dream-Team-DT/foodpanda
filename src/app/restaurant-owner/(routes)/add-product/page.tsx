import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddProduct = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Product Name</label>
          <Input placeholder="e.g., Chicken Biryani" />
          <label className="text-sm font-medium">Price (৳)</label>
          <Input type="number" placeholder="e.g., 220" />
          <label className="text-sm font-medium">Category</label>
          <Input placeholder="e.g., Rice" />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium">Short Description</label>
          <Textarea rows={6} placeholder="Ingredients, serving info, etc." />
          <label className="text-sm font-medium">Image URL</label>
          <Input placeholder="https://..." />
        </div>
      </div>
      <div className="mt-4">
        <Button className="rounded-xl">Save Product</Button>
      </div>
    </div>
  );
};

export default AddProduct;
