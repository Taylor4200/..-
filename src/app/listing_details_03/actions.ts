'use server'

import {createClient} from '@/utils/supabase/server'

export const ListResults = async (listID: number, name: string) => {

    const supabase = createClient()

    const {data, status, error} = await supabase
        .from('Listing')
        .select('*')
        .match({id: listID, name: name})

    if (error) {
        console.error('Error getting Listing:', error);
    } else {
        console.log('Listing tracked successfully:', data);
    }

    if (data) return data
};