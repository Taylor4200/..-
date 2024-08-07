interface DataType {
   page: string;
   pricing_data: {
      id: number,
      class_name?: string;
      plan: string;
      price: string;
      desc: string;
      icon_details: {
         icon: string;
         icon_class?: string;
      }[];
      btn: string;
   }[];
}[];

const pricing_data: DataType[] = [
   {
      page: "pricing_1",
      pricing_data: [
         {
            id: 1,
            class_name: "active",
            plan: "Standard",
            price: "$185",
            desc: "Basic Listing",
            icon_details: [{ icon: "fa-sharp fa-regular fa-check" }, { icon: "fa-sharp fa-regular fa-check" }, { icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "active"
         },
         {
            id: 2,
            plan: "Premium",
            price: "$325",
            desc: "Enhanced Visibility",
            icon_details: [{ icon: "fa-sharp fa-regular fa-check" }, { icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "Get Started"
         },
         {
            id: 3,
            plan: "Pro",
            price: "$485",
            desc: "Maximum Exposure",
            icon_details: [{ icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "Get Started"
         },
      ]
   },
   {
      page: "pricing_1",
      pricing_data: [
         {
            id: 1,
            class_name: "active",
            plan: "Standard",
            price: "$185",
            desc: "Basic Listing",
            icon_details: [{ icon: "fa-sharp fa-regular fa-xmark" }, { icon: "fa-sharp fa-regular fa-xmark" }, { icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "active"
         },
         {
            id: 2,
            plan: "Premium",
            price: "$325",
            desc: "Enhanced Visibility",
            icon_details: [{ icon: "fa-sharp fa-regular fa-xmark" }, { icon: "fa-sharp fa-regular fa-xmark" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "Get Started"
         },
         {
            id: 3,
            plan: "Pro",
            price: "$485",
            desc: "Maximum Exposure",
            icon_details: [{ icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" }, { icon_class: "available", icon: "fa-sharp fa-regular fa-check" },],
            btn: "Get Started"
         },
      ]
   },
];

export default pricing_data;