"use client"
import Image, { StaticImageData } from "next/image"
import NiceSelect from "@/ui/NiceSelect"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"

import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg"
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg"
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg"
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg"
import DashboardChart from "./DashboardChart"
import {Doughnut} from "react-chartjs-2";
import Link from "next/link";
import PropertyTableBody from "@/components/dashboard/properties-list/PropertyTableBody";

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   value: string;
   class_name?: string;
}

const DashboardBody = ({data}: any) => {

   const dashboard_card_data: DataType[] = [
      {
         id: 1,
         icon: icon_1,
         title: "Impressions",
         value: data?.total_visit,
         class_name: "skew-none",
      },
      {
         id: 2,
         icon: icon_2,
         title: "Click",
         value: data?.total_interect,
      },
      {
         id: 3,
         icon: icon_3,
         title: "Conversions",
         value: "",
      },
      {
         id: 4,
         icon: icon_4,
         title: "EPC",
         value: "",
      },
   ]

   const datas = {
      labels: ["Mobile", "Desktop", "Tablet", "Other"],
      datasets: [
         {
            data: [300, 50, 100, 20],
            backgroundColor: [
               "#FF6384",
               "#36A2EB",
               "#FFCE56",
               "#db3d44",
            ],
            hoverBackgroundColor: [
               "#FF6384",
               "#36A2EB",
               "#FFCE56",
               "#db3d44",
            ]
         }
      ]
   };

   const selectHandler = (e: any) => { };

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Dashboard" />

            <h2 className="main-title d-block d-lg-none">Dashboard</h2>
            <div className="bg-white border-20">
               <div className="row">
                  {dashboard_card_data.map((item) => (
                     <div key={item.id} className="col-lg-3 col-6">
                        <div className={`dash-card-one bg-white border-30 position-relative mb-15 ${item.class_name}`}>
                           <div className="d-sm-flex align-items-center justify-content-between">
                              <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"><Image src={item.icon} alt="" className="lazy-img" /></div>
                              <div className="order-sm-0">
                                 <span>{item.title}</span>
                                 <div className="value fw-500">{item.value}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">
               <div className="col-xl-7 col-lg-6 d-flex flex-column">
                  <div className="user-activity-chart bg-white border-20 mt-30 h-100">
                     <div className="d-flex align-items-center justify-content-between plr">
                        <h5 className="dash-title-two">Property View</h5>
                        <div className="short-filter d-flex align-items-center">
                           <div className="fs-16 me-2">Short by:</div>
                           <NiceSelect className="nice-select fw-normal"
                              options={[
                                 { value: "1", text: "Weekly" },
                                 { value: "2", text: "Daily" },
                                 { value: "3", text: "Monthly" },
                              ]}
                              defaultCurrent={0}
                              onChange={selectHandler}
                              name=""
                              placeholder="" />
                        </div>
                     </div>
                     <div className="plr mt-50">
                        <div className="chart-wrapper">
                           <DashboardChart />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-5 col-lg-6 d-flex position-relative">
                  <div className="recent-job-tab bg-white border-20 mt-30 plr w-100">
                     <h5 className="dash-title-two">Devices</h5>
                     <div style={{ position: "absolute", bottom: 170, left: 10, right: 10}}>
                        <p className="text-center" style={{fontWeight: "bolder", fontSize: 30}}>120,222</p>
                        <h5 className="dash-title-three text-center">Devices Accessed</h5>
                     </div>
                     <Doughnut data={datas}/>
                     {/*<RecentMessage/>*/}
                  </div>
               </div>
            </div>

            {/*<div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">*/}
            {/*   <div className=" d-flex flex-column">*/}
            {/*      <div className="user-activity-chart bg-white border-20 mt-30 h-100">*/}
            {/*         <div className="d-flex align-items-center justify-content-between plr">*/}
            {/*            <h5 className="dash-title-two">Recent Listing</h5>*/}
            {/*            <div className="short-filter d-flex align-items-center">*/}
            {/*               <button className="dash-btn-two tran3s me-3">Add Listing</button>*/}
            {/*               /!*<div className="fs-16 me-2">Short by:</div>*!/*/}

            {/*               /!*<NiceSelect className="nice-select fw-normal"*!/*/}
            {/*               /!*            options={[*!/*/}
            {/*               /!*               {value: "1", text: "Weekly"},*!/*/}
            {/*               /!*               {value: "2", text: "Daily"},*!/*/}
            {/*               /!*               {value: "3", text: "Monthly"},*!/*/}
            {/*               /!*            ]}*!/*/}
            {/*               /!*            defaultCurrent={0}*!/*/}
            {/*               /!*            onChange={selectHandler}*!/*/}
            {/*               /!*            name=""*!/*/}
            {/*               /!*            placeholder=""/>*!/*/}
            {/*            </div>*/}
            {/*         </div>*/}

            {/*         <div className="bg-white card-box p0 border-20">*/}
            {/*            <div className="table-responsive pt-25 pb-25 pe-4 ps-4">*/}
            {/*               <table className="table property-list-table">*/}
            {/*                  <thead>*/}
            {/*                  <tr>*/}
            {/*                     <th scope="col">Title</th>*/}
            {/*                     <th scope="col">Date</th>*/}
            {/*                     <th scope="col">View</th>*/}
            {/*                     <th scope="col">Status</th>*/}
            {/*                     <th scope="col">Action</th>*/}
            {/*                  </tr>*/}
            {/*                  </thead>*/}
            {/*                  <PropertyTableBody/>*/}
            {/*               </table>*/}
            {/*            </div>*/}
            {/*         </div>*/}

            {/*         <ul className="pagination-one d-flex align-items-center justify-content-center style-none pt-40">*/}
            {/*            <li className="me-3"><Link href="#">1</Link></li>*/}
            {/*            <li className="selected"><Link href="#">2</Link></li>*/}
            {/*            <li><Link href="#">3</Link></li>*/}
            {/*            <li><Link href="#">4</Link></li>*/}
            {/*            <li>....</li>*/}
            {/*            <li className="ms-2"><Link href="#" className="d-flex align-items-center">*/}
            {/*               Last <Image src={icon_1} alt="" className="ms-2"/></Link></li>*/}
            {/*         </ul>*/}
            {/*         /!*<div className="plr mt-50">*!/*/}
            {/*         /!*   <div className="chart-wrapper">*!/*/}
            {/*         /!*      <DashboardChart/>*!/*/}
            {/*         /!*   </div>*!/*/}
            {/*         /!*</div>*!/*/}
            {/*      </div>*/}
            {/*   </div>*/}
            {/*</div>*/}
         </div>
      </div>
   )
}

export default DashboardBody
