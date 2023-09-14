import Campaign from '@/model/campaign';
import { connectMongo } from '@/utility/connectToMongo';
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {



    const ITEMS_PER_PAGE = 5;



    try {

        const keyword = req.body.data??"";
        
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { target: { $regex: keyword, $options: "i" } }
            ]
        };

        const { queryTerm } = req.query

        
        await connectMongo();




        const queryData: string = queryTerm!.toString();

        const page = parseInt(queryData) || 1;

        console.log('query Data', queryData)
        let count = await Campaign.estimatedDocumentCount(query)


        const pCount = count / ITEMS_PER_PAGE;

        let pageCount = Math.ceil(pCount);



        const skip = (page - 1) * ITEMS_PER_PAGE;


        let campaign = await Campaign.find(query)
            .limit(ITEMS_PER_PAGE)
            .skip(skip)



        if (campaign) {
            return res.status(200).json({ message: 'success', campaign, pagination: { count, pageCount } });
        }

    } catch (error: any) {
        console.log(error);
      
        throw Error(error.message)
    }




}