export const trending = (req, res) => res.render("home", {pageTitle : "Home"});
export const search = (req, res) => res.send("Search"); 
export const watch = (req, res) => res.render("watch", {pageTitle : "Watch"});
export const edit = (req, res) => res.render("edit", {pageTitle : "Edit"}) // export 를 붙여주면 한 모듈이 동시에 여러개를 export를 할 수 있다.
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
