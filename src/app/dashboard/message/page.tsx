import DashboardMessage from "@/components/dashboard/message";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";
import {Get_Distance} from "@/utils/utils";

export const metadata = {
   title: "Truck Support - Dashboard Message",
};

async function getData() {

    const supabase = createClient()

    try {
        const {data, status, error} = await supabase
            .from('support')
            .select('*')
        if (data) {
            return data

        } else {
            throw new Error(`Request failed with ${status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async () => {

    const data = await getData()

   return (
      <Wrapper>
         <DashboardMessage data={data}/>
      </Wrapper>
   )
}

export default index