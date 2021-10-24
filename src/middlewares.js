import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
    s3: s3,
    bucket: 'no-spoiler/images',
    acl: "public-read",
});

const s3VideoUploader = multerS3({
    s3: s3,
    bucket: 'no-spoiler/videos',
    acl: "public-read",
});

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

const dest = multer.diskStorage({ destination : (req, file, cb) => {
    if ( file.fieldname == 'thumbnail' ) {
        cb(null, 'uploads/thumbnails/');
    }
    else if ( file.fieldname == 'video' ) {
        cb(null, 'uploads/videos/');
    }
}});

export const upload = multer({ dest, storage : isHeroku ? multerUploader : undefined });

export const uploadAvatar = multer ({ dest: "uploads/avatars/", storage: isHeroku ? s3ImageUploader: undefined });


/*
export const uploadThumbnail = multer({ dest : "uploads/thumbnails/", limits: { fileSize: 3000000 } });
export const uploadVideo = multer({ dest : "uploads/videos/", limits: { fileSize: 10000000 } });
*/
