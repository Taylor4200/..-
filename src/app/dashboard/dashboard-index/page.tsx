import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";

export const metadata = {
    title: "Dashboard Index Homy - Real Estate React Next js Template",
};

async function getVisitTotal(listID?: string ) {

    const supabase = createClient()

    try {
        if(listID) {
            const { data, error } = await supabase.rpc('get_list_performance_last_8_months', {
                ad_id: parseInt(listID),
            });

            if (error) {
                console.error('Error fetching last 8 months advertisement performance:', error);
                return [];
            }

            console.log("last 8 month report", data)

            return {
                reports: data
            };
        } else {
            const {data} = await supabase
                .from('settings')
                .select('*')
                .eq('id', 1)
                .single()

            if(data) return {data, reports: []}
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async ({
                         searchParams,
                     }: {
    searchParams: { listID?: string };
}) => {

    const {data, reports} = await getVisitTotal(searchParams?.listID)

    return (
        <Wrapper>
            <DashboardIndex data={data} reports={reports}/>
        </Wrapper>
    )
}

export default index