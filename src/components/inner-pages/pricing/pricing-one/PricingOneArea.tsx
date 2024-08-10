"use client"
import pricing_data from "@/data/inner-data/PricingData";
import Link from "next/link";
import { useState } from "react";

const tab_title: string[] = ["Monthly", "Yearly"];
const list: string[] = ["Vendor Information", "Services Provided", "First Page Guarantee", "Logo", "Analytics", "12 Month Duration"];

const getPlanText = (plan: string) => {
   switch (plan) {
      case "Standard":
         return "1";
      case "Premium":
         return "3";
      case "Pro":
         return "3+";
      default:
         return "";
   }
};

const PricingOneArea = () => {
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
       <div className="pricing-section-one mt-150 xl-mt-100">
          <div className="container">
             <div className="row">
                <div className="col-lg-10 m-auto">
                   <div className="title-one text-center mb-40 lg-mb-30 wow fadeInUp">
                      <h3>Find the listing that aligns perfectly with your business needs</h3>
                      <p className="fs-24">TruckSupport <span>&#174;</span> presents a range of listing options, allowing
                         you to pick the one that perfectly matches your specific requirements and budget!</p>
                   </div>
                </div>
             </div>

             <div className="pr-table-one">
                {/* Tab navigation (if needed) */}
                {/*<nav className="pricing-nav-one d-flex justify-content-center">*/}
                {/*   <div className="nav nav-tabs" role="tablist">*/}
                {/*      {tab_title.map((tab, index) => (*/}
                {/*         <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>*/}
                {/*      ))}*/}
                {/*   </div>*/}
                {/*</nav>*/}
                {/*<div className="discount-text mt-15 text-center">Save 30% on Annual plan</div>*/}

                <div className="dot-bg-wrapper mt-60 lg-mt-40">
                   <div className="tab-content">
                      {pricing_data.filter((items) => items.page === "pricing_1").map((pricing, index) => (
                          <div key={index} className={`tab-pane show ${activeTab === index ? "active" : ""}`} id="monthly">
                             <div className="main-bg d-flex flex-wrap justify-content-end position-relative">
                                <div className="left-panel d-none d-lg-block">
                                   <ul className="style-none">
                                      {list.map((item, i) => <li key={i}>{item}</li>)}
                                   </ul>
                                </div>
                                {pricing.pricing_data.map((item) => (
                                    <div key={item.id} className={`pr-column-wrapper ${item.class_name}`}>
                                       <div className="pr-header text-center">
                                          <div className="plan text-uppercase">{item.plan}</div>
                                          <strong className="price fw-500">{item.price}</strong>
                                          <p className="fs-16">{item.desc}</p>
                                       </div>
                                       <ul className="style-none text-center">
                                          {item.icon_details.map((icon, i) => (
                                              <li key={i}>
                                                 <span className="fw-500 color-dark">All Operating Supported</span>
                                                 {i === 1 ? (
                                                     <div className="text-icon">
                                                        <h6>{getPlanText(item.plan)}</h6>
                                                     </div>
                                                 ) : (
                                                     <div className={`icon d-flex align-items-center justify-content-center rounded-circle ${icon.icon_class}`}>
                                                        <i className={icon.icon}></i>
                                                     </div>
                                                 )}
                                              </li>
                                          ))}
                                       </ul>
                                       <div className="pr-footer text-center">
                                          <Link href="/contact" className="btn-twelve sm">{item.btn}</Link>
                                       </div>
                                    </div>
                                ))}
                             </div>
                          </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
}

export default PricingOneArea;
