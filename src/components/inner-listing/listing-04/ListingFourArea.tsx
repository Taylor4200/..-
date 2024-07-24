"use client"
import DropdownTwo from "@/components/search-dropdown/inner-dropdown/DropdownTwo";
import UseShortedProperty from "@/hooks/useShortedProperty";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Fancybox from "@/components/common/Fancybox";
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne";
import {useEffect, useState} from "react";
import dynamic from 'next/dynamic'
import {createClient} from "@/utils/supabase/client";

const ListingCard = dynamic(() => import('@/components/inner-listing/listing-04/ListingCard'), {ssr: false})
const ListingFourArea = ({data}: any) => {

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


    const itemsPerPage = 6;
    const page = "listing_6";

    // const {
    //     itemOffset,
    //     sortedProperties,
    //     currentItems,
    //     pageCount,
    //     handlePageClick,
    //     handleBathroomChange,
    //     handleBedroomChange,
    //     handleSearchChange,
    //     handlePriceChange,
    //     maxPrice,
    //     priceValue,
    //     resetFilters,
    //     selectedAmenities,
    //     handleAmenityChange,
    //     handleLocationChange,
    //     handleStatusChange,
    //     handleTypeChange,
    //     handlePriceDropChange
    // } = UseShortedProperty({itemsPerPage, page});

    // const handleResetFilter = () => {
    //     resetFilters();
    // };

    const [isMapShow, setMapShow] = useState(false)

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
                        {`Showing Results of ${data?.length}`}
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
                        <Link href="/listing_03" className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                              data-bs-toggle="tooltip" title="Switch To Grid View"><i
                            className="fa-regular fa-grid-2"></i></Link>
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
                                <div className="google-map-home" id="contact-google-map" data-map-lat="40.925372"
                                     data-map-lng="-74.276544" data-icon-path="/assetes/images/home2/map-icon.png"
                                     data-map-title="Awesome Place" data-map-zoom="12"></div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83088.3595592641!2d-105.54557276330914!3d39.29302101722867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C%20USA!5e0!3m2!1sen!2sbd!4v1699764452737!5m2!1sen!2sbd"
                                    width="600" height="450" style={{border: 0}} allowFullScreen={true} loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100">
                                </iframe>
                            </div>
                        </div> :
                        <>
                            {data?.sort((a: any, b:any) => (b?.distance != null) - (a?.distance != null) || a?.distance - b?.distance)?.map((item: any) =>
                                <ListingCard key={item?.id} item={item}/>)}

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
