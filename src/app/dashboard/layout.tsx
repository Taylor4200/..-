import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

async function checkVerify() {
    const supabase = createClient()

    const {data} = await supabase.auth.getUser()
    if (!data?.user) {
        redirect('/')
    }
    return null
}

const AdminLayout = async ({
                               children, // will be a page or nested layout
                           }: {
    children: React.ReactNode
}) => {
    await checkVerify();

    return (
        <>
            {children}
        </>
    )
}

export default AdminLayout;