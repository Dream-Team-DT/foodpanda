import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const WishList = () => {
  return (
    <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Wishlist</h3>
              {/* <ul className="space-y-3">
                {wishlist.map((w) => (
                  <li
                    key={w.id}
                    className="p-3 border rounded-lg flex justify-between items-center"
                  >
                    <span>{w.item}</span>
                    <div className="flex gap-2">
                      <Button size="sm">Order Now</Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveFromWishlist(w.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul> */}
            </CardContent>
          </Card>
  )
}

export default WishList