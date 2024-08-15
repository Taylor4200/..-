import ListingDetailsThree from "@/components/ListingDetails/listing-details-3";
import Wrapper from "@/layouts/Wrapper";
import {Get_Distance} from "@/utils/utils";
import {redirect} from "next/navigation";
import {ListResults} from "@/app/listing_details_03/actions";
import {trackInteraction} from "@/utils/utilsServer";
import {NextApiRequest} from "next";

export const dynamic = 'force-dynamic'


export const metadata = {
    title: "Truck Support - Listing Details",
};

async function serverAction(request: NextApiRequest) {
    const searchParams =  request?.searchParams

    try {
        const data = await ListResults(searchParams.id, searchParams.name)

        await trackInteraction(searchParams.id, false)

        if (data) return data?.map(item => {
            return {
                distance: Get_Distance(searchParams.latitude, item?.lat, searchParams?.longitude, item?.lng, "K"),
                ...item
            }
        })
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async (request: NextApiRequest) => {

    // if (!searchParams?.id || !searchParams?.name || !searchParams?.latitude || !searchParams?.longitude) redirect("/")
    const data = await serverAction(request)
    if (!data || data?.length === 0) redirect("/")

    return (
        <Wrapper>
            {
                (data && data[0]) ? <ListingDetailsThree data={data[0]}/> : null
            }
        </Wrapper>
    )
}

export default index