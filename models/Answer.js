import mongoose from "mongoose";
import Application from "./Application.js";
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    application : {
        type : mongoose.Schema.ObjectId,
        ref : "Application",
        required: true
    }
});

AnswerSchema.pre("save",async function(next){
    // if(!this.isModified("user")) return next();

    try {
        const application = await Application.findById(this.application);

        application.answers.push(this._id);
        application.answerCount = application.answers.length;
       

        await application.save();
        next();
    }
    catch(err) {
        return next(err);
    }
    
});

export default mongoose.model("Answer", AnswerSchema);
