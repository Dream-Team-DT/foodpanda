import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Orders = () => {
  // dummy orders and wishlist (replace with API later)
  const orders = [
    { id: 1234, items: 2, status: "Delivered" },
    { id: 1235, items: 5, status: "On the Way" },
    { id: 1236, items: 1, status: "Cancelled" },
  ];
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3">My Orders</h3>
        <ul className="space-y-6">
          {orders.map((order) => {
            const statusSteps = [
              "Placed",
              "Accepted",
              "On the Way",
              "Delivered",
            ];
            const currentIndex = statusSteps.indexOf(order.status);

            return (
              <li key={order.id} className="p-4 border rounded-lg">
                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">
                  <span>
                    <strong>Order #{order.id}</strong> – {order.items} Items
                  </span>
                  <span
                    className={
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "On the Way"
                        ? "text-yellow-600"
                        : order.status === "Accepted"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  >
                    {order.status}
                  </span>
                </div>

                {/* Tracking Steps */}
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    return (
                      <div key={step} className="flex-1 flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`flex-1 h-1 ${
                              index < currentIndex
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step Labels */}
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  {statusSteps.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Orders;
