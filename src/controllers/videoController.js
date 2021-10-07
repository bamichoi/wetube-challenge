import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" })
        return res.render("home", {pageTitle : "Home", videos });
    } catch {
        return res.render("server-error", {error});
    }
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {pageTitle : "Video not found"})  
    } 
    return res.render("watch", {pageTitle : `Watching ${video.title}`, video});

} 
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {pageTitle : "Video not found"})  
    } 
    res.render("edit", {pageTitle : `Editing ${video.title}`, video})
} // export 를 붙여주면 한 모듈이 동시에 여러개를 export를 할 수 있다.

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const { file } = req;
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
        console.log(req.file);
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
    console.log(req.files)
    const { title, description, hashtags } = req.body;
    try { 
        await Video.create({
            title,
            thumbnailUrl,
            videoUrl,
            description,
            hashtags: Video.formatHashtags(hashtags)
        })
        return res.redirect("/");
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
    return res.render("search", { pageTitle: `Search Video by ${keyword}`, videos });
}