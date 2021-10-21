import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube"
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const loginOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const logoutOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/");
    }
};

const storage = multer.diskStorage({ destination : (req, file, cb) => {
    if ( file.fieldname == 'thumbnail' ) {
        cb(null, 'uploads/thumbnails/');
    }
    else if ( file.fieldname == 'video' ) {
        cb(null, 'uploads/videos/');
    }
}});

export const upload = multer({ storage });

export const uploadAvatar = multer ({ dest: "uploads/avatars/"});


/*
export const uploadThumbnail = multer({ dest : "uploads/thumbnails/", limits: { fileSize: 3000000 } });
export const uploadVideo = multer({ dest : "uploads/videos/", limits: { fileSize: 10000000 } });
*/
