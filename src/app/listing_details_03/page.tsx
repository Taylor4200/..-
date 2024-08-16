import ListingDetailsThree from "@/components/ListingDetails/listing-details-3";
import Wrapper from "@/layouts/Wrapper";
import {Get_Distance} from "@/utils/utils";
import {redirect} from "next/navigation";
import {ListResults} from "@/app/listing_details_03/actions";
import {trackInteraction} from "@/utils/utilsServer";
import {Metadata, NextApiRequest, ResolvingMetadata} from "next";
import { cache } from 'react';

export const dynamic = 'force-dynamic'

async function fetchData({id, name}: any) {
    return await ListResults(id, name)
}

const getData = cache(fetchData);

export async function generateMetadata(
    { params, searchParams }: any,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const data = await getData(searchParams)
    const imgUrl = data && data[0]?.imageUr;
    const desc = data && data[0]?.description;
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: searchParams.name,
        description: desc,
        openGraph: {
            images: imgUrl ? [imgUrl] : []
                //['/some-specific-page-image.jpg', ...previousImages],
        },
    }
}


async function serverAction(request: NextApiRequest) {
    const searchParams =  request?.searchParams

    try {
        const data = await getData(request?.searchParams)

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