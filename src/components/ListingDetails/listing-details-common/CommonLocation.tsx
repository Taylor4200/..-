import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";

interface CommonLocationProps {
    data: {
        id: string;
        name: string;
        lat: number;
        lng: number;
    };
    height?: string; // Optional prop for height
    width?: string;  // Optional prop for width
}

const CommonLocation = ({ data, height = "75vh", width = "75%" }: CommonLocationProps) => {
    const markers = [
        {
            id: data?.id,
            name: data?.name,
            position: { lat: data?.lat, lng: data?.lng }
        },
    ];

    const [activeMarker, setActiveMarker] = useState<boolean>(false);

    const handleActiveMarker = () => {
        setActiveMarker(true);
    };

    const handleOnLoad = (map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <>
            <h5 className="mb-40">Location</h5>
            <div className="h-100">
                <GoogleMap
                    options={{
                        mapId: process?.env?.NEXT_PUBLIC_GOOGLEID || "",
                        maxZoom: 11,
                    }}
                    onLoad={handleOnLoad}
                    onClick={() => setActiveMarker(true)}
                    mapContainerStyle={{ height, width }} // Use props for height and width
                >
                    <Marker
                        position={{ lat: data?.lat, lng: data?.lng }}
                        onClick={handleActiveMarker}
                    >
                        {activeMarker ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(false)}>
                                <h6>{data?.name}</h6>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                </GoogleMap>
            </div>
        </>
    );
}

export default CommonLocation;
