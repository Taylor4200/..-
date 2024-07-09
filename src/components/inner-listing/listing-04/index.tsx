import FooterFour from "@/layouts/footers/FooterFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingFourArea from "./ListingFourArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne";

const ListingSix = () => {
   return (
      <>
         <HeaderOne style={false} />
         <ListingFourArea />
         <FancyBanner />
         <FooterOne style={true} />
      </>
   )
}

export default ListingSix;
