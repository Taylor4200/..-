import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import FooterFour from '@/layouts/footers/FooterFour'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FancyBanner from '@/components/common/FancyBanner'
import FooterOne from "@/layouts/footers/FooterOne";
import FAQ from "@/components/homes/home-two/FAQ";

const Faq = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title="Question & Answers" link="#" link_title="Pages" sub_title="Faq’s" style={true} />
          <FAQ />
         <FancyBanner style={false} />
         <FooterOne style={true}  />
      </>
   )
}

export default Faq
