import AboutUsOne from "@/components/inner-pages/about-us/about-us-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "About",
};
const index = () => {
   return (
      <Wrapper>
         <AboutUsOne />
      </Wrapper>
   )
}

export default index