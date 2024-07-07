interface DataType {
   id: number;
   id_name: string;
   title: string;
   md_pt?:boolean;
   faq: {
      id: number;
      question: string;
      answer: string;
   }[];
}

const inner_faq_data:DataType[] = [
   {
      id: 1,
      id_name: "Selling",
      title: "SELLING",
      md_pt:true,
      faq: [
         {
            id: 1,
            question: "HOW CAN I FIND THE NEAREST TRUCK STOP USING YOUR DIRECTORY?",
            answer: "Under the “Search” tab at the top of the page, enter your location, and our directory will locate all the nearest truck stops in your area.",
         },
         {
            id: 2,
            question: "CAN I ACCESS YOUR DIRECTORY THROUGH A MOBILE APP FOR CONVENIENCE ON THE ROAD?",
            answer: "As of right now you would have to use your preferred search engine. We are currently in development of a mobile app for both iOS and android, we will update you once its’s published.",
         },
         {
            id: 3,
            question: "HOW FREQUENTLY IS YOUR DIRECTORY UPDATED WITH NEW INFORMATION?",
            answer: "Whenever we receive new information from our clients, we advertise for. We will update our search directory with more locations in your area. Stay tuned if there aren’t any locations currently available in your nearby.",
         },
         {
            id: 4,
            question: "HOW CAN I REPORT INACCURACIES OR SUGGEST ADDITIONS TO YOUR DIRECTORY?",
            answer: "If you encounter any minor issues with either our directory or our website, please contact us at marketing@247trucksupport.com.\n" +
                "\n" +
                " \n" +
                "\n" +
                "For major issues or inquiries about advertising services from our company, please reach out to us at (720)-877-7184.",
         },

         {
            id: 5,
            question: "CAN I SEARCH FOR TRUCK REPAIR SHOPS OR ROADSIDE ASSISTANCE SERVICES THROUGH YOUR DIRECTORY?",
            answer: "Yes! You can search for both, depending on whether we currently have vendors available in your area.",
         },
         {
            id: 6,
            question: "DO YOU OFFER ANY NAVIGATION OR ROUTING SERVICES SPECIFICALLY TAILORED FOR TRUCK DRIVERS?",
            answer: "Not at this time",
         },
         {
            id: 7,
            question: "IS THERE A SUBSCRIPTION FEE OR ANY COSTS ASSOCIATED WITH USING YOUR DIRECTORY?",
            answer: "No! Our directory is free of charge, unlike other major truck directories!",
         },
         {
            id: 8,
            question: "DO YOU PROVIDE RATINGS OR REVIEWS FOR THE SERVICES LISTED IN YOUR DIRECTORY?",
            answer: "No, but we do provide the Google review page if available. We always make sure to choose highly reputable service providers.",
         }
      ]
   }
]

export default inner_faq_data;