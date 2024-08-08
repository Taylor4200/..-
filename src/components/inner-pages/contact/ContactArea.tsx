import Link from "next/link";
import Image from "next/image";

import circleImg from "@/assets/images/icon/icon_39.svg";
import ContactForm from "@/components/forms/ContactForm";

interface DataType {
   id: number;
   class_name?: string;
   title: string;
   address_1: string;
   address_2?: string;
   address_3?: string;
}

const address_data: DataType[] = [
   {
      id: 1,
      title: "We’re always happy to help.",
      address_1: "mailto:marketing@247trucksupport.com"
   },
   {
      id: 2,
      class_name: "skew-line",
      title: "Our hotline number",
      address_1: "tel:+3035027179"
   }
];

const ContactArea = () => {
   return (
       <div className="contact-us border-top mt-130 xl-mt-100 pt-80 lg-pt-60">
          <div className="container">
             <div className="row">
                <div className="col-xxl-9 col-xl-8 col-lg-10 m-auto">
                   <div className="title-one text-center wow fadeInUp">
                      <h3>Questions? Feel Free to Reach Out Via Message.</h3>
                   </div>
                </div>
             </div>
          </div>

          <div className="address-banner wow fadeInUp mt-60 lg-mt-40">
             <div className="container">
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-evenly">
                   {address_data.map((item) => (
                       <div key={item.id} className={`block position-relative z-1 mt-25`}>
                          <div className="d-xl-flex align-items-center">
                             <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                                <Image src={circleImg} alt="" className="lazy-img" />
                             </div>
                             <div className="text">
                                <p className="fs-22">{item.title}</p>
                                <Link href={item.address_1} className="tran3s">
                                   {item.address_1.replace(/(mailto:|tel:)/, '')}
                                </Link>
                                {item.address_2 && (
                                    <>
                                       {" "}
                                       <Link href={item.address_2} className="tran3s">
                                          {item.address_2}
                                       </Link>
                                    </>
                                )}
                                {item.address_3 && (
                                    <>
                                       {" "}
                                       <Link href={item.address_3} className="tran3s">
                                          {item.address_3}
                                       </Link>
                                    </>
                                )}
                             </div>
                          </div>
                       </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="bg-pink mt-150 xl-mt-120 md-mt-80">
             <div className="container">
                <div className="">
                   <div className="form-style-one wow fadeInUp m-auto">
                      <ContactForm />
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
};

export default ContactArea;
