
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
        const { title, description, target, } = req.body.data
        const status:string ='Active';


        let campaign = await Campaign.create({ title, description, target,status })
        
        console.log('title',title);

        if (campaign) {
            return res.status(200).json({ message: 'success', campaign });
        }

    } catch (error: any) {
        console.log(error);
        // return res.status(400).json({ error: error.message })
        throw Error(error.message)
    }




}