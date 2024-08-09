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

export const trackInteraction = async (adId: number, isCall = false) => {

    const supabase = createClient()

    const {data, error} = await supabase.rpc('track_interaction', {
        ad_id: adId,
        is_call: isCall,
    });

    if (error) {
        console.error('Error tracking interaction:', error);
    } else {
        console.log('Interaction tracked successfully:', data);
    }
};