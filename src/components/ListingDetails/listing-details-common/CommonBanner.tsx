import Link from "next/link";

const CommonBanner = ({ style_3, data }: any) => {
   return (
       <div className="row">
          <div className="col-lg-6">
             <h4 className="property-titlee">{data?.name}</h4>
             <div className="d-flex flex-wrap mt-10">
                {/* <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>FOR SELL</div> */}
                <div className="address mt-15">
                   <i className="bi bi-geo-alt"></i> {data?.address}
                </div>
             </div>
          </div>
          <div className="col-lg-6 text-lg-end">
             <div className="d-inline-block md-mt-40">
                {/* Changed div to h5 and applied inline style for font size */}
                <h5 className="price color-dark fw-500" style={{ fontSize: '24px' }}>
                   Distance: {data?.distance + " " + "Mi"}
                </h5>
                {/* Removed the buttons */}
                {/* <div className="est-price fs-20 mt-25 mb-35 md-mb-30">Est. Payment <span className="fw-500 color-dark">$8,343/mo*</span></div> */}
                <ul className="style-none d-flex align-items-center action-btns pt-15">
                   {/* Removed all the button list items */}
                   {/* <li className="me-auto fw-500 color-dark"><i className="fa-sharp fa-regular fa-share-nodes me-2"></i> Share</li>
                        <li><Link href="#" className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i className="fa-light fa-heart"></i></Link></li>
                        <li><Link href="#" className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i className="fa-light fa-bookmark"></i></Link></li>
                        <li><Link href="#" className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i className="fa-light fa-circle-plus"></i></Link></li> */}
                </ul>
             </div>
          </div>
       </div>
   );
}

export default CommonBanner;
