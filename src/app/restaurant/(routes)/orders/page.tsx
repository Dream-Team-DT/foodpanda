import { Button } from "@/components/ui/button";

// ---------- Types ----------
interface OrderRow {
  id: string;
  customer: string;
  total: string;
  status: "pending" | "preparing" | "delivered" | "cancelled";
  time: string; // e.g., "12:45 PM"
}

// ---------- Demo Data ----------
const demoOrders: OrderRow[] = [
  {
    id: "#FP-2001",
    customer: "Mahin Hasan",
    total: "৳650",
    status: "pending",
    time: "11:42 AM",
  },
  {
    id: "#FP-2000",
    customer: "Lamia Akter",
    total: "৳1,240",
    status: "preparing",
    time: "11:30 AM",
  },
  {
    id: "#FP-1999",
    customer: "Shuvo Roy",
    total: "৳870",
    status: "delivered",
    time: "10:58 AM",
  },
  {
    id: "#FP-1998",
    customer: "Arif Hossain",
    total: "৳430",
    status: "cancelled",
    time: "10:17 AM",
  },
];

// ---------- Status Badge ----------
const StatusBadge = ({ status }: { status: OrderRow["status"] }) => {
  const map: Record<OrderRow["status"], string> = {
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    preparing:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    delivered:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    cancelled:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
};

const Orders = () => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Time</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {demoOrders.map((o) => (
            <tr key={o.id} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-medium">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3">{o.total}</td>
              <td className="px-4 py-3">
                <StatusBadge status={o.status} />
              </td>
              <td className="px-4 py-3">{o.time}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Details
                  </Button>
                  <Button size="sm" className="rounded-xl">
                    Advance
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
