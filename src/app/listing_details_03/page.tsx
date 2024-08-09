import ListingDetailsThree from "@/components/ListingDetails/listing-details-3";
import Wrapper from "@/layouts/Wrapper";
import {createClient} from "@/utils/supabase/server";
import {Get_Distance} from "@/utils/utils";
import {Backdrop, CircularProgress} from "@mui/material";
import ListingFour from "@/components/inner-listing/listing-04";
import {Suspense} from "react";
import {redirect} from "next/navigation";

export const metadata = {
    title: "Listing Details Three Homy - Real Estate React Next js Template",
};

async function getData(params: { [p: string]: string | string[] | undefined }) {

    const supabase = createClient()

    try {
        const {data, status, error} = await supabase
            .from('Listing')
            .select('*')
            .match({id: params.id, name: params.name})

        const trackInteraction = async (adId: number, isCall = false) => {
            const {data, error} = await supabase.rpc('track_interaction', {
                ad_id: adId,
                is_call: isCall,
            });

            if (error) {
                console.error('Error tracking interaction:', error);
            } else {
                console.log('Interaction tracked successfully:', data);
            }
        };

        await trackInteraction(params.id, true)

        console.log({error})

        if (data) return data?.map(item => {
            return {
                distance: Get_Distance(params.latitude, item?.lat, params?.longitude, item?.lng, "K"),
                ...item
            }
        })
        else {
            throw new Error(`Request failed with ${status}`);
        }
    } catch (error) {
        // Handle the fetch error
        console.error("Error fetching data:", error);
        // You can display an error message to the user or perform any other necessary actions
    }
}

const index = async ({
                         searchParams,
                     }: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {

    const data = await getData(searchParams)
    if (!data || data?.length === 0) redirect("/")
    console.log({data})

    return (
        <Wrapper>
            {
                (data && data[0]) ? <ListingDetailsThree data={data[0]}/> : null

            }
        </Wrapper>
    )
}

export default index