import React from 'react';
import {createClient} from "@/utils/supabase/client";
import {toast} from "react-toastify";

const DistanceChange = ({data}: any) => {

    const [input, setInput] = React.useState<string>(data?.distance);

    const supabase = createClient()

    const handleChangeDistance = async () => {

        const { error } = await supabase
            .from('settings')
            .update({ distance: input })
            .eq('id', 1)

        if(!error) {
            const notify = () => toast('Distance Updated', { position: 'top-center' });
            notify();
        }

    }

    return (
        <div className="bg-white card-box border-20">
            <h4 className="dash-title-three">Update Distance</h4>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row d-flex align-items-center">
                    <div className="col-4">
                        <div className="dash-input-wrapper mb-20">
                            <label htmlFor="">Distance (in Miles)</label>
                            <input defaultValue={data?.distance} type="number"
                                   onChange={(e) => setInput(e.target.value)} className="form-control"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <a href="#" onClick={handleChangeDistance} className="dash-btn-two tran3s me-3 mt-10">Save</a>
                    </div>
                </div>


            </form>
        </div>
    );
};

export default DistanceChange;