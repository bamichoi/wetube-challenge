import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" })
        return res.render("home", {pageTitle : "Home", videos });
    } catch {
        return res.render("server-error", {error});
    }
}

export const list = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" })
        return res.render("list", {pageTitle : "Trailers", videos });
    } catch {
        return res.render("server-error", {error});
    }
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    if (!video) {
        return res.status(404).render("404", {pageTitle : "Video not found"})  
    } 
    return res.render("watch", {pageTitle : `${video.title}`, video});

} 
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {pageTitle : "Video not found"})  
    } 
    res.render("edit-video", {pageTitle : `Editing ${video.title}`, video})
} 

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const { file } = req;
    console.log(req.body);
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {pageTitle : "Video not found"})  
    } 
    try { 
        await Video.findByIdAndUpdate(id, {
        title, 
        thumbnailUrl : file ? file.path : video.thumbnailUrl,
        description, 
        hashtags: Video.formatHashtags(hashtags)
    })
        return res.redirect(`/videos/${id}`);
    }
    catch(error) {
        console.log(error)
        return res.redirect('/')
    }
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
  };
  
export const postUpload = async (req, res) => {
    const thumbnailUrl = req.files['thumbnail'][0].path
    const videoUrl = req.files['video'][0].path
    const { title, description, hashtags } = req.body;
    const { user } = req.session
    try { 
        const video = await Video.create({
            title,
            thumbnailUrl,
            videoUrl,
            description,
            hashtags: Video.formatHashtags(hashtags),
            owner: user._id
        })
        return res.redirect(`/videos/${video.id}`);
    }  catch(error) {
        console.log(error)
        return res.status(400).render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
    
  };

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/")
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({ 
            title: {
                $regex: new RegExp(keyword, "i") } // 정규표현식!!
            })
    }
    return res.render("search", { pageTitle: `Search Trailer by ${keyword}`, videos });
}


export const createComment = async (req, res) => {
    const { 
        params : {id},
        body: { text },
        session: { user } 
    } = req;

    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        writer : user._id,
        username: user.username,
        video:id
    })
    console.log(video);
    video.comments.push(comment._id);
    video.save();
    return res.status(201).json({newCommentId:comment._id, writer:user.username});
}
