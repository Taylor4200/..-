import ListingDetailsThree from "@/components/ListingDetails/listing-details-3";
import Wrapper from "@/layouts/Wrapper";
import {Get_Distance} from "@/utils/utils";
import {redirect} from "next/navigation";
import {ListResults} from "@/app/listing_details_03/actions";
import {trackInteraction} from "@/utils/utilsServer";

export const metadata = {
    title: "Truck Support - Listing Details",
};

async function serverAction(params: { id: number, name: string, latitude: number, longitude: number }) {

    try {
        const data = await ListResults(params.id, params.name)

        await trackInteraction(params.id, false)

        if (data) return data?.map(item => {
            return {
                distance: Get_Distance(params.latitude, item?.lat, params?.longitude, item?.lng, "K"),
                ...item
            }
        })
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async ({
                         searchParams,
                     }: {
    searchParams: { id: number, name: string, latitude: number, longitude: number };
}) => {

    if (!searchParams?.id || !searchParams?.name || !searchParams?.latitude || !searchParams?.longitude) redirect("/")

    const data = await serverAction(searchParams)
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