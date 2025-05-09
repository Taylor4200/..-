import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { trackInteraction } from "@/utils/utilsServer";

const SidebarInfo = ({ data }: any) => {

    const searchParams = useSearchParams();
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const supabase = createClient();

    const handleNavigate = () => {
        const latDes = data?.lat;
        const longDes = data?.lng;
        const url = "https://www.google.com/maps/dir/?api=1";
        const origin = "&origin=" + latitude + "," + longitude;
        const destination = "&destination=" + latDes + "," + longDes;
        const newUrl = new URL(url + origin + destination);

        const win = window.open(newUrl, '_blank');
        win?.focus();
    };

    const handleUserCalled = async (phone?: string) => {
        if (!phone) return;
        await trackInteraction(data.id, true);
    };

    return (
        <>
            <div className="text-center mt-0">
                <h6 className="name">{data?.name}</h6>
                <a href="#" onClick={handleNavigate} className="fs-16" style={{ color: "#FF6725" }}>Get Directions</a>
                {/*<p className="fs-16">Property Agent & Broker</p>*/}
                {/*<ul className="style-none d-flex align-items-center justify-content-center social-icon">*/}
                {/*   <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>*/}
                {/*   <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>*/}
                {/*   <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>*/}
                {/*   <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>*/}
                {/*</ul>*/}
            </div>
            <div className="divider-line mt-40 mb-45 pt-5">
                <ul className="style-none">
                    <li>Location: <span>{data?.address}</span></li>
                    <li>Website: <span><Link href={data?.website || ""}>{data?.website}</Link></span></li>
                    <li>Phone: <span><a onClick={()=>handleUserCalled(data?.phone)}
                                        href={data?.phone ? "tel:" + data?.phone : "#"}>{data?.phone}</a></span></li>
                    <li>Other Phone: <span><a onClick={() =>handleUserCalled(data?.secondary_Phone)}
                                        href={data?.secondary_Phone ? "tel:" + data?.secondary_Phone : "#"}>{data?.secondary_Phone}</a></span></li>

                </ul>
            </div>
            <a onClick={() => handleUserCalled(data?.phone || data?.secondary_Phone)} href={(data?.phone || data?.secondary_Phone) ? "tel:" + (data?.phone || data?.secondary_Phone) : "#"}
               className="btn-nine text-uppercase rounded-3 w-100 mb-10">
                CONTACT Business
            </a>
        </>
    );
};

export default SidebarInfo;
