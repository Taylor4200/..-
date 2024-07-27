"use client"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import NiceSelect from "@/ui/NiceSelect";
import PropertyTableBody from "./PropertyTableBody";

import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {Backdrop, CircularProgress} from "@mui/material";

const PropertyListBody = () => {

    const [page, setPage] = useState(1)
    const [list, setList] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState<boolean>(true)

    const NO_PER_PAGE = 10;

    const supabase = createClient()

    const from = ((page - 1) * NO_PER_PAGE)
    const to = (page * NO_PER_PAGE) - 1

    const fetchList = async () => {
        try {
            setLoading(true)

            const {data, error} = await supabase
                .from('Listing')
                .select('*')
                .range(from, to)
                .order('id', {ascending: false})

            const {count} = await supabase
                .from("Listing")
                .select("*", {count: "exact", head: true})

            if (count) setTotalCount(count)
            if (data && data?.length) setList(data);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {
        fetchList();
    }, []);

// event handler for page change on click
    const handlePageChange = async (pageNumber: number) => {
        try {
            setLoading(true)
            if (
                pageNumber > 0 &&
                pageNumber !== page
            ) {
                const fromHere = ((pageNumber - 1) * NO_PER_PAGE)
                const toHere = (pageNumber * NO_PER_PAGE) - 1
                const {data, error} = await supabase
                    .from('Listing')
                    .select('*')
                    .range(fromHere, toHere)
                    .order('id', {ascending: false})
                if (data && data?.length) setList(data);
                setPage(pageNumber);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }


    };

    const selectHandler = (e: any) => {
    };

    const handleDeleteListing = async (id: number) => {
        setLoading(true)
        try {
            const resListCat = await supabase
                .from('listingsubcategories')
                .delete()
                .eq('listid', id)

            const resList = await supabase
                .from('Listing')
                .delete()
                .eq('id', id)

            await fetchList()

            console.log({resListCat, resList})
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <div className="dashboard-body">
                <div className="position-relative">
                    <DashboardHeaderTwo title="My Properties"/>
                    <h2 className="main-title d-block d-lg-none">My Properties</h2>
                    <div className="d-sm-flex align-items-center justify-content-between mb-25">
                        <div className="fs-16">Showing <span
                            className="color-dark fw-500">{from}–{to > totalCount ? totalCount : to}</span> of <span
                            className="color-dark fw-500">{totalCount}</span> results
                        </div>
                        {/*<div className="d-flex ms-auto xs-mt-30">*/}
                        {/*    <div className="short-filter d-flex align-items-center ms-sm-auto">*/}
                        {/*        <div className="fs-16 me-2">Short by:</div>*/}
                        {/*        <NiceSelect className="nice-select"*/}
                        {/*                    options={[*/}
                        {/*                        {value: "1", text: "Newest"},*/}
                        {/*                        {value: "2", text: "Best Seller"},*/}
                        {/*                        {value: "3", text: "Best Match"},*/}
                        {/*                        {value: "4", text: "Price Low"},*/}
                        {/*                        {value: "5", text: "Price High"},*/}
                        {/*                    ]}*/}
                        {/*                    defaultCurrent={0}*/}
                        {/*                    onChange={selectHandler}*/}
                        {/*                    name=""*/}
                        {/*                    placeholder=""/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="bg-white card-box p0 border-20">
                        <div className="table-responsive pt-25 pb-25 pe-4 ps-4">
                            <table className="table property-list-table">
                                <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Created AT</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <PropertyTableBody list={list} handleDeleteListing={handleDeleteListing}/>
                            </table>
                        </div>
                    </div>


                    {list.length > 0 && (
                        <div className=" d-flex align-items-center justify-content-center style-none pt-40">
                            <div className="container mt-5">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a onClick={() => handlePageChange(page - 1)}
                                               className={`page-link ${page === 1 ? "disabled" : ""}`} href="#"
                                               aria-label="Previous">
                                                <span aria-hidden="true">&laquo; Previous</span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className={`page-link ${page > (totalCount / NO_PER_PAGE) ? "disabled" : ""}`}
                                               onClick={() => handlePageChange(page + 1)} href="#" aria-label="Next">
                                                <span aria-hidden="true">Next &raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}

                    {/*<ul className="pagination-one d-flex align-items-center justify-content-center style-none pt-40">*/}
                    {/*    <li className="me-3"><Link href="#">1</Link></li>*/}
                    {/*    <li className="selected"><Link href="#">2</Link></li>*/}
                    {/*    <li><Link href="#">3</Link></li>*/}
                    {/*    <li><Link href="#">4</Link></li>*/}
                    {/*    <li>....</li>*/}
                    {/*    <li className="ms-2"><Link href="#" className="d-flex align-items-center">*/}
                    {/*        Last <Image src={icon_1} alt="" className="ms-2"/></Link></li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        </>

    )
}

export default PropertyListBody
