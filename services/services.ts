import { ICampaign } from "@/interface.ts/campaign.interface";
import { BASE_URL } from "@/shared/constant";
import axios from "axios";


export const fetchAllCampaign = async () => {


    const response = await axios.get(`${BASE_URL}/api/campaign/getAll`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        }

    });
    console.log(response.data)
    return response.data.campaign;

}


export const createCampaign = async (data: ICampaign) => {


    const response = await axios.post(`/api/campaign/create`, {
        data,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        }

    });
    console.log(response.data)
    return response.data.data;

}


export const fetchPaginatedCampaign = async (page: number, data: string) => {
    console.log('number', page)
    console.log('search query', data)

    const queryParams = {
        title: data,

    };
    const response = await axios.post(`/api/campaign/${page}`,  {
        data:data ,
        headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
    }

    });

const results = response.data;
console.log('results', results)
return results;

}