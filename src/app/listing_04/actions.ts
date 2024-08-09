'use server'

import {createClient} from '@/utils/supabase/server'

export const ListItemResults = async (subCategory: string) => {

    const supabase = createClient()

    const {data, status, error} = await supabase
        .from('Listing')
        .select('*, listingsubcategories!inner(listid)')
        .eq('listingsubcategories.subcategoryid', parseInt(subCategory))
        .not('lat', 'is', null)
        .not('lng', 'is', null)

    if (error) {
        console.error('Error getting list item:', error);
    } else {
        console.log('List item shows successfully:', data);
    }

    if (data) return data
};

export const GetDistanceConfig = async () => {

    const supabase = createClient()

    const {data, error} = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single()

    if (error) {
        console.error('Error getting  setting distance data:', error);
    } else {
        console.log('Setting distance tracked successfully:', data);
    }

    if (data) return data
};