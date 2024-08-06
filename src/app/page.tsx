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

        if (error) {
            console.log(error)
        }

        return data
    }catch (e){
        console.log(e)
    }
}

export const metadata = {
    title: "Homy - Real Estate React Next js Template",
};
const index = async () => {

    const data = await increaseVisitTotal()

    return (
        <Wrapper>
            <HomeOne data={data}/>
        </Wrapper>
    )
}

export default index