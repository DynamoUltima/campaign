import Campaign from '@/model/campaign';
import { connectMongo } from '@/utility/connectToMongo';
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {


    try {

        console.log('called');
        await connectMongo();
        // const { title, description, target } = req.body


        let campaign = await Campaign.find()
        
       

        if (campaign) {
            return res.status(200).json({ message: 'success', campaign });
        }

    } catch (error: any) {
        console.log(error);
        
        throw Error(error.message)
    }




}