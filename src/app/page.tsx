import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";

async function increaseVisitTotal() {

    const supabase = createClient()

    const {error, data} = await supabase
        .rpc('increment_totalvisit', {x: 1, row_id: 1})

    if (error) {
        console.log(error)
    }
}

export const metadata = {
    title: "Homy - Real Estate React Next js Template",
};
const index = async () => {

    await increaseVisitTotal()

    return (
        <Wrapper>
            <HomeOne/>
        </Wrapper>
    )
}

export default index