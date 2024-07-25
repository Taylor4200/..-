"use client"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import Overview from "./Overview"
import ListingDetails from "./ListingDetails"
import Link from "next/link"
import SelectAmenities from "./SelectAmenities"
import AddressAndLocation from "../profile/AddressAndLocation"
import NiceSelect from "@/ui/NiceSelect";
import {createClient} from "@/utils/supabase/client";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChangeEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";

type state = {
    category: null | number
    subCategory: null | number
    label: string
}

interface FormDataField {
    name: string;
    description?: string;
    googlePlaceID?: string
    state: state[],
    lat?: string,
    lang?: string
}


const AddPropertyBody = () => {

    const supabase = createClient()

    const schema = yup
        .object({
            name: yup.string().required().label("name"),
            // description: yup.string().required().label("description"),
            googlePlaceID: yup.string().label("googlePlaceID"),
            state: yup.array().min(1, "You must Select least 1 Category").required("required"),
            // lat: yup.number()
            //     .nullable()
            //     .transform(value => (value === '' ? null : value))
            //     .notRequired()
            // lang: yup.number().nullable().default(null),

            //     yup.object().shape({
            //    category: yup.number().required("Please Select a category"),
            //    subCategory: yup.number().required("Please Select atleast one category"),
            // })
        }).required();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: {errors},
    } = useForm<FormDataField>({
        resolver: yupResolver(schema), defaultValues: {
            lat: "",
            lang: ""
        }
    });

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<any>([])
    const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined)

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e?.target?.files?.length > 0) setUploadedFile(e.target.files[0])
    }

    const handleRemoveFile = () => setUploadedFile(undefined)

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const onSubmit = async (data: FormDataField) => {
        try {
            setIsLoading(true)
            let url

            if (uploadedFile) {
                const fileName = Date.now().toString();
                const fileExt = fileName.split('.').pop();
                const {data, error} = await supabase
                    .storage
                    .from('images')
                    .upload(fileName, uploadedFile, {
                        contentType: `image/${fileExt}`,
                        upsert: false
                    })
                url = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
                console.log({data, error, url})
            }
            // Start a transaction
            const {data: listing, error: listingError} = await supabase
                .from('Listing')
                .insert({
                    name: data.name,
                    description: data?.description || "",
                    lat: data?.lat ? parseFloat(data?.lat) : null,
                    lng: data?.lang ? parseFloat(data?.lang) : null,
                    google_place_id: data?.googlePlaceID || "",
                    imageUrl: url,
                })
                .select()
                .single()  // Retrieve the inserted listing data including the generated listing_id

            if (listingError) {
                console.error('Error inserting listing:', listingError)
                return
            }

            console.log("list added", listing)
            const listingId = listing.id

            data?.state?.map(async item => {
                const {data: listingSubCategory, error: listingSubCategoryError} = await supabase
                    .from('listingsubcategories')
                    .insert([
                        {listid: listingId, subcategoryid: item.subCategory}
                    ])

                if (listingSubCategoryError) {
                    console.error('Error inserting into ListingSubCategory:', listingSubCategoryError)
                    return
                }

                console.log('Successfully inserted listing and linked subcategory', {listing, listingSubCategory})
            })

            scrollTop()

            const notify = () => toast('New Listing Created', {position: 'top-center'});
            notify();
            reset()
            setUploadedFile(undefined)
            setSelectedServices([])

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }


    }

    useEffect(() => {
        setIsLoading(true)
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

    const [selectedServices, setSelectedServices] = useState<state[]>([])

    const selectHandler = (e: any) => {

        const findCat = categories?.find(item => item?.id === e?.category)
        const findSubCat = findCat?.Subcategories?.find(item => item?.id === e?.subCategory)

        const isAlreadyAdded = selectedServices?.find(item => item?.label === (findCat?.name + " - " + findSubCat?.name))

        if (isAlreadyAdded) {
            setSelectedServices(prevState => prevState?.filter(item => item?.label !== isAlreadyAdded?.label))
            return
        }

        setSelectedServices(prevState => ([...prevState, {
            category: e?.category,
            subCategory: e?.subCategory,
            label: findCat?.name + " - " + findSubCat?.name
        }]))
    };

    const handleDelete = (index: number) => setSelectedServices(prevState => prevState?.filter((_, i) => i !== index))

    useEffect(() => {
        setValue("state", selectedServices)
    }, [selectedServices]);

    return (
        <div className="dashboard-body">

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <DashboardHeaderTwo title="Add New Listing"/>
            <form onSubmit={handleSubmit(onSubmit)} className="position-relative">
                <h2 className="main-title d-block d-lg-none">Add New Listing</h2>
                {/*<Overview />*/}
                <div className="bg-white card-box border-20">
                    <h4 className="dash-title-three">Overview</h4>
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">Listing Title*</label>
                        <input type="text" {...register("name")} placeholder="Your Listing Name"/>
                        <p className="form_error">{errors.name?.message}</p>
                    </div>
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">Description*</label>
                        <textarea className="size-lg" {...register("description")}
                                  placeholder="Write about listing..."></textarea>
                    </div>
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Services*</label>

                                <NiceSelect className={`nice-select `}
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

                                {/*<NiceSelect className="nice-select"*/}
                                {/*   options={[*/}
                                {/*      { value: "1", text: "Apartments" },*/}
                                {/*      { value: "2", text: "Condos" },*/}
                                {/*      { value: "3", text: "Houses" },*/}
                                {/*      { value: "4", text: "Industrial" },*/}
                                {/*      { value: "5", text: "Villas" },*/}
                                {/*   ]}*/}
                                {/*   defaultCurrent={0}*/}
                                {/*   onChange={selectHandler}*/}
                                {/*   name=""*/}
                                {/*   placeholder="" />*/}
                            </div>

                            {errors?.state && (<p className="form_error">{errors?.state?.message}</p>)}


                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*   <div className="dash-input-wrapper mb-30">*/}
                        {/*      <label htmlFor="">Listed in*</label>*/}
                        {/*      <NiceSelect className="nice-select"*/}
                        {/*         options={[*/}
                        {/*            { value: "1", text: "All Listing" },*/}
                        {/*            { value: "2", text: "Buy" },*/}
                        {/*            { value: "3", text: "Sell" },*/}
                        {/*            { value: "4", text: "Rent" },*/}
                        {/*         ]}*/}
                        {/*         defaultCurrent={0}*/}
                        {/*         onChange={selectHandler}*/}
                        {/*         name=""*/}
                        {/*         placeholder="" />*/}
                        {/*   </div>*/}
                        {/*</div>*/}
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Google Place ID</label>
                                <input type="text" {...register("googlePlaceID")} placeholder="Enter Google Place ID"/>
                                <p className="form_error">{errors.googlePlaceID?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <div className="container">
                                    <div id="chip-container">
                                        {
                                            selectedServices?.map((item, index) => (
                                                <div key={index} className="chip">
                                                    {item?.label}
                                                    <span onClick={() => handleDelete(index)}
                                                          className="close-btn">&times;</span>
                                                </div>
                                            ))
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*   <div className="dash-input-wrapper mb-30">*/}
                        {/*      <label htmlFor="">Yearly Tax Rate*</label>*/}
                        {/*      <input type="text" placeholder="Tax Rate" />*/}
                        {/*   </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Latitude</label>

                                <Controller
                                    name="lat"
                                    control={control}
                                    render={({field}) => (
                                        <input {...field} type="number" placeholder="Enter Latitude"/>
                                    )}
                                />


                                <p className="form_error">{errors.lat?.message}</p>
                            </div>


                        </div>
                        <div className="col-md-6">
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="">Longitude</label>
                                <Controller
                                    name="lang"
                                    control={control}
                                    render={({field}) => (
                                        <input {...field} type="number" placeholder="Enter Longitude"/>
                                    )}
                                />
                                <p className="form_error">{errors.lang?.message}</p>
                            </div>
                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*   <div className="dash-input-wrapper mb-30">*/}
                        {/*      <label htmlFor="">Yearly Tax Rate*</label>*/}
                        {/*      <input type="text" placeholder="Tax Rate" />*/}
                        {/*   </div>*/}
                        {/*</div>*/}
                    </div>
                </div>


                {/*<ListingDetails />*/}

                <div className="bg-white card-box border-20 mt-40">
                    <h4 className="dash-title-three">Photo & Video Attachment</h4>


                    {
                        uploadedFile ?
                            <div className="dash-input-wrapper mb-20">
                                <label htmlFor="">File Attachment*</label>
                                <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                                    <span>{uploadedFile?.name}</span>
                                    <button onClick={handleRemoveFile} className="remove-btn"><i
                                        className="bi bi-x"></i></button>
                                </div>
                                {/*<div className="attached-file d-flex align-items-center justify-content-between mb-15">*/}
                                {/*    <span>PorpertyImage_02.jpg</span>*/}
                                {/*    <Link href="#" className="remove-btn"><i className="bi bi-x"></i></Link>*/}
                                {/*</div>*/}
                            </div>
                            : null
                    }


                    <div className="dash-btn-one d-inline-block position-relative me-3">
                        <i className="bi bi-plus"></i>
                        Upload File
                        <input onChange={handleFileUpload} type="file" accept="image/*" id="uploadCV" name="uploadCV"
                               placeholder=""/>
                    </div>
                    {/*<small>Upload file .jpg, .png, .mp4</small>*/}
                </div>
                {/*<SelectAmenities />*/}
                {/*<AddressAndLocation/>*/}

                <div className="button-group d-inline-flex align-items-center mt-30">
                    <button type="submit" className="dash-btn-two tran3s me-3">Submit Listing</button>
                    <Link href="#" className="dash-cancel-btn tran3s">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddPropertyBody
