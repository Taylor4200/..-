// Define the types for the pricing data
interface IconDetail {
   icon: string;
   icon_class?: string;
 }
 
 interface PricingDetail {
   id: number;
   class_name?: string;
   plan: string;
   price_monthly: string;
   price_yearly: string;
   desc: string;
   icon_details: IconDetail[];
   btn: string;
 }
 
 interface PricingData {
   page: string;
   pricing_data: PricingDetail[];
 }
 
 const pricing_data: PricingData[] = [
   {
     page: "pricing_1",
     pricing_data: [
       {
         id: 1,
         plan: "Standard",
         class_name: "standard",
         price_monthly: "$21/mo",
         price_yearly: "$185/yr",
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
         class_name: "premium",
         price_monthly: "$36/mo",
         price_yearly: "$325/yr",
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
         class_name: "pro",
         price_monthly: "$54/mo",
         price_yearly: "$485/yr",
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
 