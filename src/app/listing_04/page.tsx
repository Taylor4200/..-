import ListingFour from "@/components/inner-listing/listing-04";
import Wrapper from "@/layouts/Wrapper";
import {Get_Distance} from "@/utils/utils";
import {GetDistanceConfig, ListItemResults} from "@/app/listing_04/actions";

export const metadata = {
    title: "Listing Four Homy - Real Estate React Next js Template",
};

async function serverAction(params: { category: string, subCategory: string, latitude: number, longitude: number }) {

    try {

        const data= await ListItemResults(params.subCategory)

        const distanceData = await GetDistanceConfig()

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
            return arrayWithDistance?.filter(item => item?.distance <= (distanceData?.distance || 100))
        } else {
            throw new Error(`Request failed with`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const index = async ({
                         searchParams,
                     }: {
    searchParams: { category: string, subCategory: string, latitude: number, longitude: number };
}) => {

    const data = await serverAction(searchParams)

    return (
        <Wrapper>
            <ListingFour data={data}/>
        </Wrapper>
    )
}

export default index