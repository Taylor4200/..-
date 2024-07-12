import NiceSelect from "@/ui/NiceSelect";

const Overview = () => {

   const selectHandler = (e: any) => { };

   return (
      <div className="bg-white card-box border-20">
         <h4 className="dash-title-three">Overview</h4>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Listing Title*</label>
            <input type="text" placeholder="Your Listing Name" />
         </div>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Description*</label>
            <textarea className="size-lg" placeholder="Write about listing..."></textarea>
         </div>
         <div className="row align-items-end">
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Services*</label>

                   <NiceSelect className={`nice-select `}
                               options={[
                                   {
                                       value: "Mobile Repair",
                                       text: "Mobile Repair",
                                       data: ["Truck Repair", "Trailer Repair", "Tire Repair", "Refrigeration"]
                                   },
                                   {
                                       value: "Repair Shops",
                                       text: "Repair Shops",
                                       data: ["Truck Shops", "Trailer Shops", "Tire Shops", "Reefer Shops"]
                                   },
                                   {value: "Towering Service", text: "Towering Service", data: []},
                                   {
                                       value: "National Network",
                                       text: "National Network",
                                       data: ["Love's Truck Care", "Goodyear Commercial", "Boss Truck Shops", "Speedco"]
                                   },
                                   {
                                       value: "Truck Shops",
                                       text: "Truck Shops",
                                       data: ["All Truck Shops", "With Service", "With Parking", "With Showers", "With Scales"]
                                   },
                                   {
                                       value: "Truck Wash",
                                       text: "Truck Wash",
                                       data: ["Tractor Wash", "Trailer Wash", "Tanker Wash"]
                                   },
                                   {
                                       value: "Heavy Duty Parts",
                                       text: "Heavy Duty Parts",
                                       data: ["Truck Parts", "Trailer Parts", "Engine Parts", "Truck Accessories"]
                                   },
                                   {value: "Dealer Truck", text: "Dealer Truck", data: ["CatePiller", "Cummins"]},
                               ]}
                               defaultCurrent={0}
                               onChange={selectHandler}
                               name=""
                               placeholder=""/>

                  {/*<NiceSelect className="nice-select"*/}
                  {/*   options={[*/}
                  {/*      { value: "1", text: "Apartments" },*/}
                  {/*      { value: "2", text: "Condos" },*/}
                  {/*      { value: "3", text: "Houses" },*/}
                  {/*      { value: "4", text: "Industrial" },*/}
                  {/*      { value: "5", text: "Villas" },*/}
                  {/*   ]}*/}
                  {/*   defaultCurrent={0}*/}
                  {/*   onChange={selectHandler}*/}
                  {/*   name=""*/}
                  {/*   placeholder="" />*/}
               </div>
            </div>
            {/*<div className="col-md-6">*/}
            {/*   <div className="dash-input-wrapper mb-30">*/}
            {/*      <label htmlFor="">Listed in*</label>*/}
            {/*      <NiceSelect className="nice-select"*/}
            {/*         options={[*/}
            {/*            { value: "1", text: "All Listing" },*/}
            {/*            { value: "2", text: "Buy" },*/}
            {/*            { value: "3", text: "Sell" },*/}
            {/*            { value: "4", text: "Rent" },*/}
            {/*         ]}*/}
            {/*         defaultCurrent={0}*/}
            {/*         onChange={selectHandler}*/}
            {/*         name=""*/}
            {/*         placeholder="" />*/}
            {/*   </div>*/}
            {/*</div>*/}
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Google Place ID*</label>
                  <input type="text" placeholder="Enter Google Place ID" />
               </div>
            </div>
            {/*<div className="col-md-6">*/}
            {/*   <div className="dash-input-wrapper mb-30">*/}
            {/*      <label htmlFor="">Yearly Tax Rate*</label>*/}
            {/*      <input type="text" placeholder="Tax Rate" />*/}
            {/*   </div>*/}
            {/*</div>*/}
         </div>
      </div>
   )
}

export default Overview;
