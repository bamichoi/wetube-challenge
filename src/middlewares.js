import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube"
    res.locals.loggedInUser = req.session.user;
    console.log(res.locals)
    next();
}

export const uploadThumbnail = multer({ dest : "uploads/thumbnails/", limits: { fileSize: 3000000 } });
export const uploadVideo = multer({ dest : "uploads/videos/", limits: { fileSize: 10000000 } });

