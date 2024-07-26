import HeaderOne from "@/layouts/headers/HeaderOne"
import dynamic from "next/dynamic";
import FooterOne from "@/layouts/footers/FooterOne";
import FancyBanner from "@/components/common/FancyBanner";

const ListingDetailsThreeArea = dynamic(() => import('./ListingDetailsThreeArea'), {ssr: false})


const ListingDetailsThree = ({data}: any) => {
    return (
        <>
            <HeaderOne style={true}/>
            <ListingDetailsThreeArea data={data}/>
            {/*<FancyBanner />*/}
            <FancyBanner />
            <FooterOne style={true}/>
        </>
    )
}

export default ListingDetailsThree
