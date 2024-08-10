// Define the types for the pricing data
interface IconDetail {
   icon: string;
   icon_class?: string;
}

interface PricingDetail {
   id: number;
   class_name?: string;
   plan: string;
   price: string;
   desc: string;
   icon_details: IconDetail[];
   btn: string;
}

interface PricingData {
   page: string;
   pricing_data: PricingDetail[];
}

// Example data
const pricing_data: PricingData[] = [
   {
      page: "pricing_1",
      pricing_data: [
         {
            id: 1,
            plan: "Standard",
            price: "$185",
            desc: "Basic Listing",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         },
         {
            id: 2,
            plan: "Premium",
            price: "$325",
            desc: "Enhanced Visibility",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         },
         {
            id: 3,
            plan: "Pro",
            price: "$485",
            desc: "Maximum Exposure",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         }
      ]
   },
   {
      page: "pricing_1",
      pricing_data: [
         {
            id: 1,
            plan: "Standard",
            price: "$185",
            desc: "Basic Listing",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         },
         {
            id: 2,
            plan: "Premium",
            price: "$325",
            desc: "Enhanced Visibility",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-xmark" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         },
         {
            id: 3,
            plan: "Pro",
            price: "$485",
            desc: "Maximum Exposure",
            icon_details: [
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" },
               { icon: "fa-sharp fa-regular fa-check" }
            ],
            btn: "Contact"
         }
      ]
   }
];

export default pricing_data;
