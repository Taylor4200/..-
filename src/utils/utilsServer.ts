'use server'

import {createClient} from '@/utils/supabase/server'

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