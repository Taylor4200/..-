"use client"
import Image from "next/image"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne";

import titleShape from "@/assets/images/shape/shape_01.svg"
import bannerThumb from "@/assets/images/assets/truckHome2.png"
import Background1 from "@/assets/images/assets/Background1_Services.png"
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";


const Banner = () => {

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

    return (
        <div className="hero-banner-one bg-pink z-1 pt-225 xl-pt-200 pb-250 xl-pb-150 lg-pb-100 position-relative">
            <div className="container position-relative pt-35 pb-35">
                <div className="row">
                    <div className="col-xxl-10 col-xl-9 col-lg-10 col-md-10 m-auto">
                        <h1 className="hero-heading text-center wow fadeInUp" style={{color: "#fff", fontSize: 80}}>Search for Local Truck Support

                            {/*<span*/}
                            {/*className="d-inline-block position-relative">Support <Image src={titleShape} alt=""*/}
                            {/*                                                            className="lazy-img"/></span>*/}
                        </h1>
                        {/*<p className="fs-24 color-dark text-center pt-35 pb-35 wow fadeInUp" data-wow-delay="0.1s">We’ve*/}
                        {/*    more than 745,000 Service Available.</p>*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-10 m-auto">
                        <div className="search-wrapper-one layout-one bg position-relative">
                            <div className="bg-wrapper">
                                <DropdownOne style={true} categories={categories}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Image style={{top: 120, height: 800}} src={bannerThumb} alt=""
                   className="lazy-img shapes w-100 illustration"/>
        </div>
    )
}

export default Banner
