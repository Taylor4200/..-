import NiceSelect from "@/ui/NiceSelect";

const DropdownOne = ({ style }: any) => {

   const selectHandler = (e: any) => { };

   const searchHandler = () => {
      window.location.href = '/listing_04';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-4 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">I’m looking for...</div>
                  <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "Mobile Repair", text: "Mobile Repair", data:["Truck Repair", "Trailer Repair", "Tire Repair", "Refrigeration"] },
                        { value: "Repair Shops", text: "Repair Shops", data:["Truck Shops", "Trailer Shops", "Tire Shops", "Reefer Shops"] },
                        { value: "Towering Service", text: "Towering Service", data:[] },
                        { value: "National Network", text: "National Network", data:["Love's Truck Care", "Goodyear Commercial", "Boss Truck Shops", "Speedco"] },
                        { value: "Truck Shops", text: "Truck Shops", data:["All Truck Shops", "With Service", "With Parking", "With Showers", "With Scales"] },
                         { value: "Truck Wash", text: "Truck Wash", data:["Tractor Wash", "Trailer Wash", "Tanker Wash"] },
                         { value: "Heavy Duty Parts", text: "Heavy Duty Parts", data:["Truck Parts", "Trailer Parts", "Engine Parts", "Truck Accessories"] },
                         { value: "Dealer Truck", text: "Dealer Truck", data:["CatePiller", "Cummins"] },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-5" : "col-xl-4"} col-lg-4`}>
               <div className="input-box-one border-left">
                  <div className="label">Location</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "germany", text: "Berlin, Germany", data:[] },
                        { value: "dhaka", text: "Dhanmondi, Dhaka", data:[] },
                        { value: "mexico", text: "Acapulco, Mexico", data:[] },
                        { value: "france", text: "Cannes, France", data:[] },
                        { value: "india", text: "Delhi, India", data:[] },
                        { value: "giza", text: "Giza, Egypt", data:[] },
                        { value: "cuba", text: "Havana, Cuba", data:[] },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            {/*<div className="col-xl-3 col-lg-4">*/}
            {/*   <div className="input-box-one border-left border-lg-0">*/}
            {/*      <div className="label">Price Range</div>*/}
            {/*      <NiceSelect*/}
            {/*         className={`nice-select ${style ? "fw-normal" : ""}`}*/}
            {/*         options={[*/}
            {/*            { value: "1", text: "$10,000 - $200,000" },*/}
            {/*            { value: "2", text: "$20,000 - $300,000" },*/}
            {/*            { value: "3", text: "$30,000 - $400,000" },*/}
            {/*         ]}*/}
            {/*         defaultCurrent={0}*/}
            {/*         onChange={selectHandler}*/}
            {/*         name=""*/}
            {/*         placeholder="" />*/}
            {/*   </div>*/}
            {/*</div>*/}
            <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
               <div className="input-box-one lg-mt-10">
                  <button className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}>{style ? "Search Now" : "Search"}</button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
