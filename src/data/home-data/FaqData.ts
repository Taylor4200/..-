interface DataType {
   id: number;
   page: string
   question: string;
   answer: string;
   showAnswer: boolean;
}

const faq_data:DataType[] = [
   {
      id: 1,
      page: "home_2_faq_1",
      question: "How Can I Find The Nearest Truck Stop Using Your Directory?",
      answer: "Under the “Search” tab at the top of the page, enter your location, and our directory will locate all the nearest truck stops in your area.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_1",
      question: "Can I Access Your Directory Through A Mobile App For Convenience On The Road?",
      answer: "As of right now you would have to use your preferred search engine. We are currently in development of a mobile app for both iOS and android, we will update you once its’s published.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_1",
      question: "How Frequently Is Your Directory Updated With New Information?",
      answer: "Whenever we receive new information from our clients, we advertise for. We will update our search directory with more locations in your area. Stay tuned if there aren’t any locations currently available in your nearby.",
      showAnswer: false,
   },

   // home_2_faq_2

   {
      id: 4,
      page: "home_2_faq_2",
      question: "How Can I Report Inaccuracies Or Suggest Additions To Your Directory?",
      answer: "If you encounter any minor issues with either our directory or our website, please contact us at marketing@trucksupport.com.\n" +
          "\n" +
          " \n" +
          "\n" +
          "For major issues or inquiries about Advertising services from our company, please reach out to us at (720)-877-7184.",
      showAnswer: false,
   },
   {
      id: 5,
      page: "home_2_faq_2",
      question: "Can I Search For Truck Repair Shops Or Roadside Assistance Services Through Your Directory?",
      answer: "Yes! You can search for both, depending on whether we currently have vendors available in your area.",
      showAnswer: false,
   },
   {
      id: 6,
      page: "home_2_faq_2",
      question: "Do You Offer Any Navigation Or Routing Services Specifically Tailored For Truck Drivers?",
      answer: "Not at this time",
      showAnswer: false,
   },
   {
      id: 7,
      page: "home_2_faq_2",
      question: "Is There A Subscription Fee Or Any Costs Associated With Using Your Directory?",
      answer: "No! Our directory is free of charge, unlike other major truck directories!",
      showAnswer: false,
   },

   // home_six
   
   {
      id: 8,
      page: "home_six",
      question: "Do You Provide Ratings Or Reviews For The Services Listed In Your Directory?",
      answer: "No, but we do provide the Google review page if available. We always make sure to choose highly reputable service providers.",
      showAnswer: false,
   },
   // {
   //    id: 2,
   //    page: "home_six",
   //    question: "What’s our goal",
   //    answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .",
   //    showAnswer: false,
   // },
   // {
   //    id: 3,
   //    page: "home_six",
   //    question: "Our vision",
   //    answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .",
   //    showAnswer: false,
   // },
];

export default faq_data;