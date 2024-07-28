import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";

export const metadata = {
    title: "Dashboard Index Homy - Real Estate React Next js Template",
};

async function getVisitTotal() {

    const supabase = createClient()

    try {
        const {data} = await supabase
            .from('settings')
            .select('*')
            .eq('id', 1)
            .single()
        if(data) return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async () => {

    const data = await getVisitTotal()

    return (
        <Wrapper>
            <DashboardIndex data={data}/>
        </Wrapper>
    )
}

export default index