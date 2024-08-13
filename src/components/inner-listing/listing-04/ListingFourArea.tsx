"use client"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne";
import {useEffect, useMemo, useState} from "react";
import dynamic from 'next/dynamic'
import {createClient} from "@/utils/supabase/client";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import noImageIcon from "@/assets/images/listing/NoImagePhoto.jpg";
import Image from "next/image";
import Link from "next/link";
import {trackInteraction} from "@/utils/utilsServer";

const ListingCard = dynamic(() => import('@/components/inner-listing/listing-04/ListingCard'), {ssr: false})
const ListingFourArea = ({data}: any) => {

    const featureList = useMemo(() => data?.filter(item => item?.featured), [data])
    const nonFeatureList = useMemo(() => data?.filter(item => !item?.featured), [data])


    const supabase = createClient()

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<any>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase.from('Categories').select(`
  id, 
  name, 
  Subcategories ( id, name )
`)
            console.log({data})
            setCategories(data)
            setIsLoading(false)
        }

        fetchPosts()
    }, [])

    const [isMapShow, setMapShow] = useState(false)

    const markers = data?.map(item => {
        return {
            id: item.id,
            name: item?.name,
            position: {lat: item?.lat, lng: item?.lng},
            scale: item?.type === "pro" ? 0.7 : item?.type === "premium" ? 0.5 : 0.2,
            imageUrl: item?.imageUrl,
            phone: item?.phone,
            type: item?.type
        }
    })

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

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process?.env?.NEXT_PUBLIC_GOOGLEAPIKEY || "",
    });

    const handleUserCalled = async (id: number, phone: any) => {
        if (!phone) return
        await trackInteraction(id, true)
    }

    return (
        <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-170 xl-pb-120 mt-150 xl-mt-120">
            <div className="container">
                <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
                    <div className="bg-wrapper border-layout">
                        {
                            categories ? <DropdownOne style={true} categories={categories}/> : null
                        }

                        {/*<DropdownTwo*/}
                        {/*   handlePriceDropChange={handlePriceDropChange}*/}
                        {/*   handleSearchChange={handleSearchChange}*/}
                        {/*   handleBedroomChange={handleBedroomChange}*/}
                        {/*   handleBathroomChange={handleBathroomChange}*/}
                        {/*   handlePriceChange={handlePriceChange}*/}
                        {/*   maxPrice={maxPrice}*/}
                        {/*   priceValue={priceValue}*/}
                        {/*   handleResetFilter={handleResetFilter}*/}
                        {/*   selectedAmenities={selectedAmenities}*/}
                        {/*   handleAmenityChange={handleAmenityChange}*/}
                        {/*   handleLocationChange={handleLocationChange}*/}
                        {/*   handleStatusChange={handleStatusChange}*/}
                        {/*/>*/}
                    </div>
                </div>

                <div
                    className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                    <div>
                        {/*{`Showing Results of ${data?.length}`}*/}
                        {/*Showing */}
                        {/*<span*/}
                        {/*    className="color-dark fw-500">{itemOffset + 1}–{itemOffset + currentItems.length}</span> of <span*/}
                        {/*className="color-dark fw-500">{sortedProperties.length}</span> */}
                        {/*results*/}
                    </div>
                    <div className="d-flex align-items-center xs-mt-20">
                        <div className="short-filter d-flex align-items-center">
                            <div className="fs-16 me-2">Short by:</div>
                            {/*<NiceSelect*/}
                            {/*    className="nice-select"*/}
                            {/*    options={[*/}
                            {/*        {value: "newest", text: "Newest"},*/}
                            {/*        {value: "best_seller", text: "Best Seller"},*/}
                            {/*        {value: "best_match", text: "Best Match"},*/}
                            {/*        {value: "price_low", text: "Price Low"},*/}
                            {/*        {value: "price_high", text: "Price High"},*/}
                            {/*    ]}*/}
                            {/*    defaultCurrent={0}*/}
                            {/*    // onChange={handleTypeChange}*/}
                            {/*    name=""*/}
                            {/*    placeholder=""/>*/}
                        </div>
                        {/*<Link href="/listing_03" className="tran3s layout-change rounded-circle ms-auto ms-sm-3"*/}
                        {/*      data-bs-toggle="tooltip" title="Switch To Grid View"><i*/}
                        {/*    className="fa-regular fa-grid-2"></i></Link>*/}
                        <div onClick={() => setMapShow(prevState => !prevState)}
                             className="tran3s layout-change rounded-circle ms-auto ms-sm-3" style={{cursor: "pointer"}}
                             data-bs-toggle="tooltip" title="Switch To Map"><i
                            className="fa-regular fa-map"></i></div>
                    </div>
                </div>

                {
                    isMapShow ?
                        <div className="hero-banner-seven position-relative mt-120 lg-mt-100">
                            <div id="" className="h-100">
                                {
                                    isLoaded ?
                                        <GoogleMap options={{
                                            mapId: process?.env?.NEXT_PUBLIC_GOOGLEID || "",
                                        }}
                                                   onLoad={handleOnLoad}
                                                   onClick={() => setActiveMarker(null)}
                                                   mapContainerStyle={{height: "100vh"}}
                                        >
                                            {markers.map(({id, name, position, scale, imageUrl, phone, type}) => (
                                                <Marker
                                                    icon={{
                                                        path: "M27.648-41.399q0-3.816-2.7-6.516t-6.516-2.7-6.516 2.7-2.7 6.516 2.7 6.516 6.516 2.7 6.516-2.7 2.7-6.516zm9.216 0q0 3.924-1.188 6.444l-13.104 27.864q-.576 1.188-1.71 1.872t-2.43.684-2.43-.684-1.674-1.872l-13.14-27.864q-1.188-2.52-1.188-6.444 0-7.632 5.4-13.032t13.032-5.4 13.032 5.4 5.4 13.032z",
                                                        fillColor: '#E32831',
                                                        fillOpacity: 1,
                                                        strokeWeight: 0,
                                                        scale: scale
                                                    }}
                                                    key={id}
                                                    position={position}
                                                    onClick={() => handleActiveMarker(id)}
                                                >
                                                    {activeMarker === id ? (
                                                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                            <div style={{
                                                                width: "100%",
                                                                minWidth: 200,
                                                                height: (imageUrl && type !== "standard") ? 420 : 160
                                                            }}>

                                                                {
                                                                    imageUrl && type !== "standard" &&
                                                                    (<Image src={imageUrl} width={0}
                                                                            height={0}
                                                                            sizes="100vw"
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '67%',
                                                                                borderRadius: 5,
                                                                            }} alt="" className="lazy-img icon me-2"/>)
                                                                }


                                                                <h6 style={{marginTop: 20}}>{name}</h6>

                                                                <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    width: "100%",
                                                                    justifyContent: "space-between"
                                                                }}>
                                                                    <a href={phone ? "tel:" + phone : "#"}
                                                                       onClick={() => handleUserCalled(id, phone)}
                                                                       style={{
                                                                           backgroundColor: "#F2F6F9",
                                                                           width: "48%",
                                                                           height: 60,
                                                                           textAlign: "center",
                                                                           display: "flex",
                                                                           alignItems: "center",
                                                                           justifyContent: "center",
                                                                           cursor: "pointer"
                                                                       }}>
                                                                        <i className="fa-regular fa-phone-volume fa-2x"></i>

                                                                    </a>
                                                                    <Link
                                                                        href={`/listing_details_03?id=${id}&name=${name}&latitude=${position?.lat}&longitude=${position?.lng}`}

                                                                        style={{
                                                                            backgroundColor: "#F2F6F9",
                                                                            width: "48%",
                                                                            height: 60,
                                                                            textAlign: "center",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center", cursor: "pointer"
                                                                        }}>
                                                                        <i className="fa-solid fa-arrow-up-right-from-square fa-2x"></i>
                                                                    </Link>
                                                                </div>

                                                            </div>
                                                        </InfoWindow>
                                                    ) : null}
                                                </Marker>
                                            ))}
                                        </GoogleMap> : null
                                }
                            </div>
                        </div> :
                        <>

                            <div>
                                <h5 className="my-3">Featured Results ({featureList?.length})</h5>
                                <div>
                                    {featureList?.sort((a: any, b: any) => (b?.distance != null) - (a?.distance != null) || a?.distance - b?.distance)?.map((item: any) =>
                                        <ListingCard key={item?.id} item={item}/>)}
                                </div>
                            </div>

                            <div>
                                <h5 className="my-3">All Result ({nonFeatureList?.length})</h5>
                                <div>
                                    {nonFeatureList?.sort((a: any, b: any) => (b?.distance != null) - (a?.distance != null) || a?.distance - b?.distance)?.map((item: any) =>
                                        <ListingCard key={item?.id} item={item}/>)}
                                </div>
                            </div>


                            {/*<div className="pt-50 md-pt-20 text-center">*/}
                            {/*    <ReactPaginate*/}
                            {/*        breakLabel="..."*/}
                            {/*        nextLabel={<i className="fa-regular fa-chevron-right"></i>}*/}
                            {/*        onPageChange={handlePageClick}*/}
                            {/*        pageRangeDisplayed={pageCount}*/}
                            {/*        pageCount={pageCount}*/}
                            {/*        previousLabel={<i className="fa-regular fa-chevron-left"></i>}*/}
                            {/*        renderOnZeroPageCount={null}*/}
                            {/*        className="pagination-two d-inline-flex align-items-center justify-content-center style-none"*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </>
                }


            </div>
        </div>
    )
}

export default ListingFourArea
