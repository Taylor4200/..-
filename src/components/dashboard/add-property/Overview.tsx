import NiceSelect from "@/ui/NiceSelect";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


type state = {
    category: null | number
    subCategory: null | number
    label: string
}

interface FormData {
    name: string;
    description?: string;
    googlePlaceID: string
}


const Overview = () => {

    const supabase = createClient()

    const schema = yup
        .object({
            name: yup.string().required().label("name"),
            // description: yup.string().required().label("description"),
            googlePlaceID: yup.string().required().label("googlePlaceID"),
        })
        .required();

    const {register, handleSubmit, reset, formState: {errors},} = useForm<FormData>({resolver: yupResolver(schema),});
    const onSubmit = async (data: FormData) => {

    }

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white card-box border-20">
            <h4 className="dash-title-three">Overview</h4>
            <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Listing Title*</label>
                <input type="text" {...register("name")} placeholder="Your Listing Name"/>
                <p className="form_error">{errors.name?.message}</p>
            </div>
            <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Description*</label>
                <textarea className="size-lg" {...register("description")} placeholder="Write about listing..."></textarea>
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
                        <label htmlFor="">Google Place ID*</label>
                        <input type="text" {...register("googlePlaceID")} placeholder="Enter Google Place ID"/>\
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
        </form>
    )
}

export default Overview;
