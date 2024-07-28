import DashboardHeaderOne from "@/layouts/headers/dashboard/DashboardHeaderOne";
import AccountSettingBody from "./AccountSettingBody";
import {createClient} from "@/utils/supabase/server";

async function getDistance() {
    const supabase = createClient()

    try {
        const {data, status, error} = await supabase
            .from('settings')
            .select('*')
            .eq('id', 1)
            .single()

        if (data) return data
        else {
            throw new Error(`Request failed with ${status}`);
        }

    } catch (error) {
        // Handle the fetch error
        console.error("Error fetching data:", error);
        // You can display an error message to the user or perform any other necessary actions
    }
}

const DashboardAccountSetting = async () => {

    const data = await getDistance()
    return (
        <>
            <DashboardHeaderOne/>
            <AccountSettingBody data={data}/>
        </>
    )
}

export default DashboardAccountSetting;
