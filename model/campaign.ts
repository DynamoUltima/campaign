import { Schema, model, models } from "mongoose";



const campaignSchema = new Schema({

    title: String,
    description: String,
    target: {
        type: String,
       
    },
    status:String
   
   
   

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const Campaign = models.Campaign || model('Campaign', campaignSchema);

export default Campaign;