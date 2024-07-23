import NiceSelect from "@/ui/NiceSelect";
import {FocusEventHandler, LegacyRef, useCallback, useRef, useState} from "react";
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import {libraries} from "@/utils/utils";
import {usePlacesWidget} from "react-google-autocomplete";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const DropdownOne = ({style, categories}: any) => {

    const [locationError, setLocationError] = useState(false);
    const [selectionError, setSelectionError] = useState(false);
    const [showUserLocation, setShowUserLocation] = useState(false);
    const [locationShowError, setLocationShowError] = useState(false)

    const handleClose = () => setLocationShowError(false)

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

    const handleUserLocation = (e: any) => {
        const value = e.target.value
        if (value === "") setShowUserLocation(true)
        else setShowUserLocation(false)
    }

    const handleRemoveOnLeave = () => {
        setTimeout(() => setShowUserLocation(false), 200)
    }

    var locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    async function success (pos: PositionCallback) {
        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&sensor=false&key=${process?.env?.NEXT_PUBLIC_GOOGLEAPIKEY}`);
        const data = await res.json()
        console.log({data})

        if(data?.plus_code?.compound_code){
            ref.current.value = data?.plus_code?.compound_code;

            setLocationState({
                latitude: crd?.latitude || null,
                longitude: crd?.longitude || null
            })
        }
    }

    function errors(err: PositionErrorCallback) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const handleFindUserLocation = (e: any) => {

        e.preventDefault()

        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then(function (result) {
                    console.log(result);
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success, errors, locationOptions);
                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success, errors, locationOptions);
                    } else if (result.state === "denied") {
                        setLocationShowError(true)
                        //If denied then you have to show instructions to enable location
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }


    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
            }}>
                <div className="row gx-0 align-items-center">
                    <div className={`${style ? "col-xl-4" : "col-xl-4"} col-lg-4`}>
                        <div className="input-box-one border-left"
                             style={{border: locationError ? '1px solid red' : "auto"}}>
                            <div className="label">Location</div>

                            {/*{*/}
                            {/*    isLoaded ?*/}
                            {/*        <Autocomplete*/}
                            {/*            restrictions={restrictions} options={options}*/}
                            {/*            onLoad={() => console.log('Do something onLoad')}*/}
                            {/*            onPlaceChanged={handleOnPlaceChanged}*/}
                            {/*            fields={['geometry.location', 'formatted_address']}*/}
                            {/*        >*/}
                            <input onFocus={handleUserLocation} onBlur={handleRemoveOnLeave} ref={ref}
                                   style={{border: 0, marginLeft: 15, width: "100%"}}
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
                        <div className="input-box-one border-left"
                             style={{border: selectionError ? '1px solid red' : 0}}>
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

                        {
                            showUserLocation ?
                                <button onClick={handleFindUserLocation}
                                        className={`fw-500 tran3s tran3s search-btn-three`}
                                        style={{
                                            position: "absolute",
                                            left: 55,
                                            bottom: -40,
                                            backgroundColor: "#fff",
                                            color: "#ff6725"
                                        }}>Use My Location</button> : null
                        }
                    </div>
                </div>


            </form>
            <Modal
                open={locationShowError}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Share your location
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        To get the most out of Find Truck Service® locator, please fill in the location field by sharing
                        your location or selecting one.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default DropdownOne;
