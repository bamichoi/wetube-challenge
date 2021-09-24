let videos = [{
    title:"Frist Video",
    rating:5,
    comments:2,
    createdAt:"2 minutes ago",
    views:1,
    id:1,
},
{
    title:"Second Video",
    rating:5,
    comments:2,
    createdAt:"2 minutes ago",
    views:59,
    id:2,
}]

export const trending = (req, res) => {
    return res.render("home", {pageTitle : "Home", videos});
}
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1]
    return res.render("watch", {pageTitle : `Watching ${video.title}`, video});
} 
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1]
    res.render("edit", {pageTitle : `Editing ${video.title}`, video})
} // export 를 붙여주면 한 모듈이 동시에 여러개를 export를 할 수 있다.
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
  };
  
export const postUpload = (req, res) => {
    const { title } = req.body;
    const newVideo = {
      title,
      rating: 0,
      comments: 0,
      createdAt: "just now",
      views: 0,
      id: videos.length + 1,
    };
    videos.push(newVideo);
    return res.redirect("/");
  };
