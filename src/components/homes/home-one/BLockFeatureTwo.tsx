"use client"
import Image from "next/image"
import Link from "next/link";
import Count from "@/components/common/Count";
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";

import featureShape from "@/assets/images/assets/screen_01.png";

const BLockFeatureTwo = ({settingData}: any) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="block-feature-two mt-150 xl-mt-110">
            <div className="wrapper">
               <div className="row gx-xl-5">
                  <div className="col-xxl-7 col-md-6 d-flex wow fadeInLeft">
                     <div className="block-one w-100 h-100">
                        <div className="position-relative z-1 h-100">
                           {/*<h3 className="mb-55 tex">Secure your family&apos;s dream home.</h3>*/}
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="fancybox video-icon d-flex align-items-center justify-content-center rounded-circle ms-3" data-fancybox="">
                              <i className="fa-solid fa-play"></i>
                           </a>
                           <div className="" style={{ top: 240, right: 520 }}>
                              {/*<h3 className="main-count fw-500">0<span className="counter"><Count number={7} /></span>+</h3>*/}
                              {/*<p className="fs-20">Years Experience <br />with proud.</p>*/}
                           </div>
                           {/*<Image src={featureShape} alt="" className="lazy-img shapes screen_01" />*/}
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-5 col-md-6 wow fadeInRight">
                     <div className="block-two">
                        <div className="bg-wrapper">
                           <h4>Our Mission</h4>
                           <p className="fs-22 mt-20">Connecting truckers with reliable, verified services 24/7 to ensure seamless operations and minimal downtime on the road.</p>
                           <div className="counter-wrapper ps-xl-3 pb-30 mt-45 mb-50">
                              <div className="row">
                                 <div className="col-6">
                                    <div className="counter-block-one mt-20">
                                       <div className="main-count fw-500 color-dark"><span className="counter"><Count number={settingData?.total_interect} /></span>+</div>
                                       <span>Total Calls</span>
                                    </div>
                                 </div>
                                 <div className="col-6">
                                    <div className="counter-block-one mt-20">
                                       <div className="main-count fw-500 color-dark"><span className="counter"><Count number={settingData?.total_visit} /></span>+</div>
                                       <span>Total Impressions</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <ul className="list-style-one fs-22 color-dark style-none">
                              <li>Nationwide Services</li>
                              <li>New listings added daily</li>
                              <li>24/7 Support</li>
                           </ul>
                           <div className="d-inline-flex flex-wrap align-items-center mt-15 md-mt-10">
                              <Link href="/about" className="btn-two mt-20 me-4"><span>More Details</span></Link>
                              {/*<Link href="/contact" className="btn-three mt-20"><span>Request a Callback</span> <i className="fa-light fa-arrow-right-long"></i></Link>*/}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"XJ7DCbkTrPI"}
         />
         {/* video modal end */}
      </>
   )
}

export default BLockFeatureTwo
