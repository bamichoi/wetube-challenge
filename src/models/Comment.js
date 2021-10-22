import mongoose  from "mongoose";


const commentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80},
    text: { type: String, required: true, trim: true,},
    writer:  { type: mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
    video: {  type: mongoose.Schema.Types.ObjectId, required:true, ref:"Video" },
    createdAt: { type: Date, required: true, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
