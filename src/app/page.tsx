import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";

async function increaseVisitTotal() {

    const supabase = createClient()

    try {
        const {data, status} = await supabase
            .from('Listing')
            .select('*')
            .range(0, 5)
            .order('id', {ascending: false})

        const {error} = await supabase
            .rpc('increment_totalvisit', {x: 1, row_id: 1})

        const {data: settingData} = await supabase
            .from('settings')
            .select('*')
            .eq('id', 1)
            .single()

        if (error) {
            console.log(error)
        }

        return {data, settingData}
    }catch (e){
        console.log(e)
    }
}

export const metadata = {
    title: "Homy - Real Estate React Next js Template",
};
const index = async () => {

    const {data, settingData} = await increaseVisitTotal()

    return (
        <Wrapper>
            <HomeOne data={data} settingData={settingData}/>
        </Wrapper>
    )
}

export default index