"use client"

import Image from "next/image"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne";

import bannerThumb from "@/assets/images/assets/truckHome2.png"
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const Banner = () => {
    const supabase = createClient()

    const [categories, setCategories] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('Categories')
                .select(`
                    id,
                    name,
                    sort_order,
                    Subcategories ( id, name )
                `)
                .order('sort_order', { ascending: true })

            if (error) {
                console.error('Error fetching categories:', error)
            } else {
                setCategories(data || [])
            }
            setIsLoading(false)
        }

        fetchCategories()
    }, [])

    return (
        <div className="hero-banner-one bg-pink z-1 pt-225 xl-pt-200 pb-250 xl-pb-150 lg-pb-100 position-relative">
            <div className="container position-relative pt-35 pb-35">
                <div className="row">
                    <div className="col-xxl-10 col-xl-9 col-lg-10 col-md-10 m-auto">
                        <h1 className="hero-heading text-center wow fadeInUp" style={{ color: "#fff", fontSize: 80 }}>
                            Search For Local Truck
                            <br />
                            Support
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-10 m-auto">
                        <div className="search-wrapper-one layout-one bg position-relative">
                            <div className="bg-wrapper">
                                <DropdownOne style={true} categories={categories} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Image 
                style={{ top: 120, height: 800 }}
                src={bannerThumb}
                alt="Truck Support Directory"
                className="lazy-img shapes w-100 illustration"
            />
        </div>
    )
}

export default Banner
