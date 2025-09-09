import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Products = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="rounded-2xl overflow-hidden">
            <div className="h-32 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Chicken Bowl {i}</p>
                  <p className="text-xs text-muted-foreground">
                    Rice, chicken, salad
                  </p>
                  <p className="mt-2 font-semibold">৳220</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Hide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
