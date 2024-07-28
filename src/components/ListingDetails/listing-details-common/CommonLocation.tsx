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
            <div className="bg-white shadow4 border-20 p-30">
                <div className="map-banner overflow-hidden border-15" style={{height: 700}}>
                    <div className="gmap_canvas h-100 w-100">
                        <GoogleMap options={{
                            streetViewControl: false,
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
