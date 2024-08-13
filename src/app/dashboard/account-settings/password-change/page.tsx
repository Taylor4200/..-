import PasswordChange from "@/components/dashboard/account-settings/password-change";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Truck Support - Dashboard account password change",
};
const index = () => {
   return (
      <Wrapper>
         <PasswordChange />
      </Wrapper>
   )
}

export default index