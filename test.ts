type offerType = "Free_dalivery" | "Accecpts_voucher" | "deals";

type cuisinesType =
  | "Asian"
  | "Bakery"
  | "Bangladeshi"
  | "Beverage"
  | "Fish"
  | "etc";

type menuType = {
  _id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  type?: string;
};

interface restaurentTyepe {
  _id: string;
  title: string;
  slogan?: string;
  banner?: string;
  address: string;
  isOpen: boolean;
  offer?: offerType;
  isSuper?: boolean;
  cuisines?: cuisinesType;
  menus: menuType[];
}

export const restaurent: restaurentTyepe = {
  _id: "string",
  title: "string",
  slogan: "string",
  banner: "string",
  address: "string",
  isOpen: true,
  offer: "deals",
  isSuper: true,
  menus: [
    {
      _id: "string",
      name: "string",
      description: "string",
      image: "string",
      price: 100,
      type: "",
    },
    {
      _id: "string",
      name: "string",
      description: "string",
      image: "string",
      price: 200,
      type: "",
    },
  ],
};
