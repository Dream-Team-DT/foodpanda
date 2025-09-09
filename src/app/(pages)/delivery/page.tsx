"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Slider from "@/app/_component/UI/Slider/Slider";
import Card from "@/app/_component/UI/Card";
import CardBox from "@/app/_component/UI/CardBox";
import SearchBox from "@/app/_component/UI/SearchBox";
import Sidebar from "../_components/shared/sidebar/Sidebar";
import { Restaurant } from "@/types";



export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { selectedCuisines, selectedPrices, offers, quickFilter, sortBy } =
    useSelector((state: RootState) => state.filters);
  const favourites = useSelector((state: RootState) => state.favourites.items);

  useEffect(() => {
    setLoading(true);

    fetch("/api/restaurants", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter & Sort
  const filteredRestaurants = useMemo(() => {
    let res = [...restaurants];
    if (selectedCuisines.length)
      res = res.filter((r) => selectedCuisines.includes(r.cuisine));
    if (selectedPrices.length)
      res = res.filter((r) => selectedPrices.includes(r.priceLabel));
    if (offers.length) res = res.filter((r) => offers.includes(r.offer || ""));
    quickFilter.forEach((f) => {
      if (f === "rating4") res = res.filter((r) => r.rating >= 4);
      if (f === "super") res = res.filter((r) => r.isSuper);
    });
    if (sortBy === "fastest")
      res.sort((a, b) => a.deliveryTime - b.deliveryTime);
    if (sortBy === "distance") res.sort((a, b) => a.distance - b.distance);
    if (sortBy === "top") res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [
    restaurants,
    selectedCuisines,
    selectedPrices,
    offers,
    quickFilter,
    sortBy,
  ]);

  return (
    <div className="container relative mx-auto xl:grid grid-cols-9 gap-5 2xl:gap-12">
      <div className="hidden xl:block col-span-2">
        <div className="sticky top-[122px] p-4 h-[calc(100vh_-_122px)]">
          <div className="size-full border border-fp-gray rounded-2xl overflow-y-scroll">
            <Sidebar />
          </div>
        </div>
      </div>

      <div className="px-4 col-span-7 mt-5 md:pt-8">
        {/* <SearchBox /> */}
        <SearchBox />

        {/* Deals Section */}
        <Slider seeMore categName="Your daily deals">
          {Array.from({ length: 10 }).map((_, i) => (
            <Image
              key={i}
              src="https://images.deliveryhero.io/image/fd-bd/campaign-assets/02e77d64-5036-11f0-a83e-0657f0b942b8/desktop_tile_EnigiJ.png"
              height={500}
              width={500}
              alt="Banner"
              className="w-[300px] cursor-pointer hover:scale-105 transition"
            />
          ))}
        </Slider>

        {/* Deals Section */}
        <Slider seeMore categName="Your favourite cuisines">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card
              key={i}
              size="sm"
              content={{
                banner:
                  "https://images.deliveryhero.io/image/fd-bd/LH/yzit-listing.jpg?width=400&amp;height=225",
                title: "Bazar Lagbe",
              }}
            />
          ))}
        </Slider>

        {/* New on foodpanda Section */}
        <Slider seeMore categName="New on foodpanda">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card
              key={i}
              size="md"
              content={{
                banner:
                  "https://images.deliveryhero.io/image/fd-bd/LH/yzit-listing.jpg?width=400&amp;height=225",
                title: "Bazar Lagbe",
                description: "Kabab",
                rating: 5.6,
                ratingPersion: 140,
                deliveryTime: "25-35",
                deliveryCharge: "49",
              }}
            />
          ))}
        </Slider>

        {loading ? (
          <h1 className="text-center text-3xl font-bold">Loading</h1>
        ) : (
          <CardBox categName="All restaurants">
            {filteredRestaurants.map((restaurant) => (
              <Card
                key={restaurant._id}
                content={{
                  banner: restaurant.image,
                  title: restaurant.name,
                  description: "Kabab",
                  rating: restaurant.rating,
                  ratingPersion: 140,
                  deliveryTime: "25-35",
                  deliveryCharge: "49",
                }}
              />
            ))}
          </CardBox>
        )}
      </div>
    </div>
  );
}
