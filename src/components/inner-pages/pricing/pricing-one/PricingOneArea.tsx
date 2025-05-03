"use client"
import pricing_data from "@/data/inner-data/PricingData";
import Link from "next/link";
import { useState } from "react";

const tab_title: string[] = ["Monthly", "Yearly"];
const list: string[] = [
  "Vendor Information",
  "Services Provided",
  "First Page Guarantee",
  "Logo",
  "Analytics",
  "12 Month Duration"
];

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
  const [activeTab, setActiveTab] = useState(1); // Default to Yearly

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
              <p className="fs-24">
                TruckSupport <span>&#174;</span> presents a range of listing options, allowing
                you to pick the one that perfectly matches your specific requirements and budget!
              </p>
            </div>
          </div>
        </div>

        {/* Toggle UI */}
        <nav className="pricing-nav-one d-flex justify-content-center">
          <div className="nav nav-tabs" role="tablist">
            {tab_title.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`nav-link ${activeTab === index ? "active" : ""}`}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
        <div className="discount-text mt-15 text-center">
          {activeTab === 1
  ? "Best value – save 25% with yearly billing"
  : "Month-to-month flexibility – or switch to yearly & save 25%"}
        </div>

        <div className="pr-table-one">
          <div className="dot-bg-wrapper mt-60 lg-mt-40">
            <div className="tab-content">
              {pricing_data
                .filter((items) => items.page === "pricing_1")
                .slice(0, 1)
                .map((pricing) => (
                  <div key={activeTab} className="tab-pane show active" id="pricing-toggle">
                    <div className="main-bg d-flex flex-wrap justify-content-end position-relative">
                      <div className="left-panel d-none d-lg-block">
                        <ul className="style-none">
                          {list.map((item, i) => {
                            const label =
                              item === "12 Month Duration"
                                ? activeTab === 0
                                  ? "Billed Monthly"
                                  : "Billed Annually"
                                : item;
                            return <li key={i}>{label}</li>;
                          })}
                        </ul>
                      </div>

                      {pricing.pricing_data.map((item) => (
                        <div key={item.id} className={`pr-column-wrapper ${item.class_name}`}>
                          <div className="pr-header text-center">
                            <div className="plan text-uppercase">{item.plan}</div>
                            <strong className="price fw-500">
                              {activeTab === 0 ? item.price_monthly : item.price_yearly}
                            </strong>
                            <p className="fs-16">{item.desc}</p>
                          </div>

                          <ul className="style-none text-center">
                            {item.icon_details.map((icon, i) => (
                              <li key={i}>
                                <span className="fw-500 color-dark">{list[i]}</span>
                                {i === 1 ? (
                                  <div className="text-icon">
                                    <h6>{getPlanText(item.plan)}</h6>
                                  </div>
                                ) : (
                                  <div
                                    className={`icon d-flex align-items-center justify-content-center rounded-circle ${icon.icon_class}`}
                                  >
                                    <i className={icon.icon}></i>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>

                          <div className="pr-footer text-center">
                            <Link href="/contact" className="btn-twelve sm">
                              {item.btn}
                            </Link>
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

      {/* 👇 Scoped Toggle Styles */}
      <style jsx>{`
  .nav-tabs {
    all: unset;
    display: flex;
    gap: 0;
  }

  .nav-link {
    all: unset;
    background-color: #fff !important;
    color: #000 !important;
    border: 1px solid #000 !important;
    border-radius: 4px 0 0 4px !important;
    padding: 8px 16px !important;
    font-weight: 500 !important;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out !important;
  }

  .nav-link + .nav-link {
    border-left: none !important;
    border-radius: 0 4px 4px 0 !important;
  }

  .nav-link.active {
    background-color: #000 !important;
    color: #fff !important;
    border-color: #000 !important;
  }

  .discount-text {
    color: #000 !important;
  }
`}</style>
    </div>
  );
};

export default PricingOneArea;
