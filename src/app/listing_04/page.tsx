import ListingFour from "@/components/inner-listing/listing-04";
import Wrapper from "@/layouts/Wrapper";
// import supabase from "@/utils/supabase/client";
import { createClient } from '@/utils/supabase/server'
import {Get_Distance} from "@/utils/utils";
import {Backdrop, CircularProgress} from "@mui/material";


export const metadata = {
    title: "Listing Four Homy - Real Estate React Next js Template",
};

async function getData(params: { category: string, subCategory: string, latitude: string, longitude: string }) {

    const supabase = createClient()

    try {
        const {data, status, error} =   await supabase
            .from('Listing')
            .select('*, listingsubcategories!inner(listid)')
            .eq('listingsubcategories.subcategoryid', parseInt(params.subCategory))

        //     await supabase.rpc('test5', {
        //     // lat: 40.807313,
        //     // long: -73.946713,
        //     subcategoryid: 23111
        // })



        console.log({error})


        if (data) {
            return data?.map(item => {
                let distance = null
                if (params.latitude && params.longitude && item?.lat && item?.lng) {
                    distance =  Get_Distance(params.latitude, item?.lat, params?.longitude, item?.lng, "K")
                }
                return {
                    distance,
                    ...item
                }
            })
            // Process the data as needed
        } else {
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

    // console.log({searchParams:searchParams.category})

    const data = await getData(searchParams)
    console.log({data, lenghthss: data?.length})

    if(!data) return (
        <Backdrop
            sx={{ color: '#fff' }}
            open={!data}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )

    return (
        <Wrapper>
            <ListingFour data={data}/>
        </Wrapper>
    )
}

export default index