import mongoose  from "mongoose";


const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80},
    thumbnailUrl: { type: String, required: true, },
    videoUrl: { type: String, required: true, },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: Date.now},
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, required:true, default: 0},
    },
    comments : [ { type: mongoose.Schema.Types.ObjectId, required:true, ref:"Comment" } ],
    owner : { type: mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
});

//  middleware 는 model이 생성되기전에 만들어야함

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map(word => (word.startsWith('#') ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;


