import ListingFour from "@/components/inner-listing/listing-04";
import Wrapper from "@/layouts/Wrapper";
// import supabase from "@/utils/supabase/client";
import {createClient} from '@/utils/supabase/server'
import {Get_Distance} from "@/utils/utils";
import {Backdrop, CircularProgress} from "@mui/material";
import {Suspense} from "react";


export const metadata = {
    title: "Listing Four Homy - Real Estate React Next js Template",
};

async function getData(params: { category: string, subCategory: string, latitude: string, longitude: string }) {

    const supabase = createClient()

    try {
        const {data, status, error} = await supabase
            .from('Listing')
            .select('*, listingsubcategories!inner(listid)')
            .eq('listingsubcategories.subcategoryid', parseInt(params.subCategory))
            .not('lat', 'is', null)
            .not('lng', 'is', null)

        //     await supabase.rpc('test5', {
        //     // lat: 40.807313,
        //     // long: -73.946713,
        //     subcategoryid: 23111
        // })


        console.log({error})


        if (data) {
            const arrayWithDistance = data?.map(item => {
                let distance = null
                if (params.latitude && params.longitude && item?.lat && item?.lng) {
                    distance = Get_Distance(params.latitude, item?.lat, params?.longitude, item?.lng, "K")
                }
                return {
                    distance,
                    ...item
                }
            })
            return arrayWithDistance?.filter(item => item?.distance <= 100)
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

    return (
        <Wrapper>
            <Suspense fallback={
                <Backdrop
                    sx={{color: '#fff'}}
                    open={true}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }>
                <ListingFour data={data}/>
            </Suspense>

        </Wrapper>
    )
}

export default index