import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import {useState} from "react";

const CommonLocation = ({data}: any) => {

    const markers = [
        {
            id: data?.id,
            name: data?.name,
            position: {lat: data?.lat, lng: data?.lng}
        },
    ];

    const [activeMarker, setActiveMarker] = useState<boolean>(false);

    const handleActiveMarker = () => {
        setActiveMarker(true);
    };

    const handleOnLoad = (map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({position}) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <>
            <h4 className="mb-40">Location</h4>
            <div id="" className="h-100">

                <GoogleMap options={{
                    mapId: process?.env?.NEXT_PUBLIC_GOOGLEID || "",
                    maxZoom: 11,
                }}
                           onLoad={handleOnLoad}
                           onClick={() => setActiveMarker(true)}
                           mapContainerStyle={{height: "100vh"}}
                >
                    <Marker
                        position={{lat: data?.lat, lng: data?.lng}}
                        onClick={handleActiveMarker}
                    >
                        {activeMarker ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(false)}>
                                <h6>{data?.name}
                                </h6>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                </GoogleMap>

            </div>
        </>
    )
}

export default CommonLocation;
