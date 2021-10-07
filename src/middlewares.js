import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube"
    res.locals.loggedInUser = req.session.user;
    console.log(res.locals)
    next();
}


const storage = multer.diskStorage({ destination : (req, file, cb) => {
    if ( file.fieldname == 'thumbnail' ) {
        cb(null, 'uploads/thumbnails/');
    }
    else if ( file.fieldname == 'video' ) {
        cb(null, 'uploads/videos/');
    }
}});

export const upload = multer({ storage });




export const uploadThumbnail = multer({ dest : "uploads/thumbnails/", limits: { fileSize: 3000000 } });
export const uploadVideo = multer({ dest : "uploads/videos/", limits: { fileSize: 10000000 } });

