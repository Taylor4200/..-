'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'

export async function login(datas: any) {

    // try {
        const supabase = createClient()

        const {error, data} = await supabase.auth.signInWithPassword(datas)

        if (error) {
            return {
                message: error.message,
                status: 500,
            };
        }
        console.log(data)

        revalidatePath('/', 'layout')
        redirect('/dashboard/dashboard-index')
    // }
    // catch (error: any) {
    //     console.log(error)
    //     return {
    //         message: error.message,
    //         status: 500,
    //     };
    // }


}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}