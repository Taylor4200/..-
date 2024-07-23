import NiceSelect from "@/ui/NiceSelect";
import {LegacyRef, useCallback, useRef, useState} from "react";
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import {libraries} from "@/utils/utils";
import {usePlacesWidget} from "react-google-autocomplete";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const DropdownOne = ({style, categories}: any) => {

    const [locationError, setLocationError] = useState(false);
    const [selectionError, setSelectionError] = useState(false);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const [locationState, setLocationState] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({
        latitude: null,
        longitude: null,
    })

    const [state, setState] = useState({
        category: null,
        subCategory: null,
    })

    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null)

    const selectHandler = (e: any) => {
        setState({category: e?.category, subCategory: e?.subCategory})
    };

    const searchHandler = () => {
        let error = false
        if (locationState?.longitude === null || locationState.latitude === null) {
            setLocationError(true)
            error = true
        } else {
            setLocationError(false)
            error = false
        }

        if (state?.category === null || state?.subCategory === null) {
            setSelectionError(true)
            error = true;
        } else {
            setSelectionError(false)
            error = false;
        }
        if (error) return
        // window.location.href = '/listing_04';

        router.push('/listing_04' + '?' + `${createQueryString('category', state?.category) + '&' + createQueryString('subCategory', state?.subCategory) + '&' + createQueryString('latitude', locationState?.latitude) + '&' + createQueryString('longitude', locationState?.longitude)}`)
    };

    const handleOnPlaceChanged = () => {
        /*
          Do something onPlaceChanged
       */
    };

    const restrictions = {
        country: ['us', 'ca']
    }

    const options = {
        strictBounds: true,
        componentRestrictions: {country: ['us', 'ca']},
    };

    // const {isLoaded} = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process?.env?.NEXT_PUBLIC_GOOGLEAPIKEY || "",
    //     libraries
    // });

    const {ref} = usePlacesWidget<any>({
        apiKey: process?.env?.NEXT_PUBLIC_GOOGLEAPIKEY || "",
        onPlaceSelected: (place) => {
            setLocationState({
                latitude: place?.geometry?.location?.lat() || null,
                longitude: place?.geometry?.location?.lng() || null
            })
        },
        options: options,
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            searchHandler();
        }}>
            <div className="row gx-0 align-items-center">
                <div className={`${style ? "col-xl-4" : "col-xl-4"} col-lg-4`}>
                    <div className="input-box-one border-left" style={{border: locationError ? '1px solid red' : 0}}>
                        <div className="label">Location</div>

                        {/*{*/}
                        {/*    isLoaded ?*/}
                        {/*        <Autocomplete*/}
                        {/*            restrictions={restrictions} options={options}*/}
                        {/*            onLoad={() => console.log('Do something onLoad')}*/}
                        {/*            onPlaceChanged={handleOnPlaceChanged}*/}
                        {/*            fields={['geometry.location', 'formatted_address']}*/}
                        {/*        >*/}
                        <input ref={ref} style={{border: 0, marginLeft: 15, width: "100%"}}
                               placeholder="Enter your address"/>
                        {/*{*/}
                        {/*    error ? <p style={{ color: "red", fontSize: 12 }}>Please select the Address</p> : null*/}
                        {/*}*/}
                        {/*        </Autocomplete>*/}
                        {/*        : null*/}
                        {/*}*/}

                    </div>
                </div>
                <div className="col-xl-5 col-lg-4">
                    <div className="input-box-one border-left" style={{border: selectionError ? '1px solid red' : 0}}>
                        <div className="label">I’m looking for...</div>
                        <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
                                    options={categories?.map(item => {
                                        return {
                                            value: item?.id,
                                            text: item?.name,
                                            data: item?.Subcategories?.map(data => ({
                                                label: data?.name,
                                                value: data?.id
                                            }))
                                        }
                                    })}
                                    defaultCurrent={0}
                                    onChange={selectHandler}
                                    name=""
                                    placeholder="Select Service"/>
                    </div>
                </div>
                {/*<div className="col-xl-3 col-lg-4">*/}
                {/*   <div className="input-box-one border-left border-lg-0">*/}
                {/*      <div className="label">Price Range</div>*/}
                {/*      <NiceSelect*/}
                {/*         className={`nice-select ${style ? "fw-normal" : ""}`}*/}
                {/*         options={[*/}
                {/*            { value: "1", text: "$10,000 - $200,000" },*/}
                {/*            { value: "2", text: "$20,000 - $300,000" },*/}
                {/*            { value: "3", text: "$30,000 - $400,000" },*/}
                {/*         ]}*/}
                {/*         defaultCurrent={0}*/}
                {/*         onChange={selectHandler}*/}
                {/*         name=""*/}
                {/*         placeholder="" />*/}
                {/*   </div>*/}
                {/*</div>*/}
                <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
                    <div className="input-box-one lg-mt-10">
                        <button
                            className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}>{style ? "Search Now" : "Search"}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default DropdownOne;
