export const search = (req, res) => res.send("Search");
export const trending = (req, res) => res.send("Home page Videos");
export const watch = (req, res) =>{
    console.log(req.params);
    res.send("Watch Video");
} 
export const edit = (req, res) => res.send("Edit Video"); // export 를 붙여주면 한 모듈이 동시에 여러개를 export를 할 수 있다.
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
