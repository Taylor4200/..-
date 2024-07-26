import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import {useState} from "react";

const CommonLocation = ({data}: any) => {

    const markers = [
        {
            id: data.id,
            name: data?.name,
            position: {lat: data?.lat, lng: data?.lng}
        },
        // {
        //     id: 2,
        //     name: "Denver, Colorado",
        //     position: { lat: 39.739235, lng: -104.99025 }
        // },
        // {
        //     id: 3,
        //     name: "Los Angeles, California",
        //     position: { lat: 34.052235, lng: -118.243683 }
        // },
        // {
        //     id: 4,
        //     name: "New York, New York",
        //     position: { lat: 40.712776, lng: -74.005974 }
        // }
    ];

    const [activeMarker, setActiveMarker] = useState<number | null>(null);

    const handleActiveMarker = (marker: number) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({position}) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <>
            <h4 className="mb-40">Location</h4>
            <div className="bg-white shadow4 border-20 p-30">
                <div className="map-banner overflow-hidden border-15">
                    <div className="gmap_canvas h-100 w-100">
                        <GoogleMap
                            onLoad={handleOnLoad}
                            onClick={() => setActiveMarker(null)}
                            mapContainerStyle={{width: "100vw", height: "100vh"}}
                        >
                            {markers.map(({id, name, position}) => (
                                <Marker
                                    key={id}
                                    position={position}
                                    onClick={() => handleActiveMarker(id)}
                                >
                                    {activeMarker === id ? (
                                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                            <div>{name}</div>
                                        </InfoWindow>
                                    ) : null}
                                </Marker>
                            ))}
                        </GoogleMap>

                        {/*<iframe*/}
                        {/*   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83088.3595592641!2d-105.54557276330914!3d39.29302101722867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C%20USA!5e0!3m2!1sen!2sbd!4v1699764452737!5m2!1sen!2sbd"*/}
                        {/*   width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy"*/}
                        {/*   referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100">*/}
                        {/*</iframe>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonLocation;
