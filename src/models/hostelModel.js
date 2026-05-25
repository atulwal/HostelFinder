import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Owner"  
    },
    address: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        default: 0
    },
    

})

const hostelModel = mongoose.model("Hostel", hostelSchema);
export default hostelModel;