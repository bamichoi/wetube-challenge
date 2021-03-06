import User from "../models/User";
import bcrypt from "bcrypt";

export const join = (req, res) => res.render("join", { pageTitle: "Join us"});

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2 } = req.body;
    const pageTitle = "Join us"
    if (password !== password2 ) {
        return res.status(400).render("join", { pageTitle, errorMessage:"Password does not match."})
    }
    const exists = await User.exists({$or: [{username}, {email}] });
    if (exists) {
        return res.status(400).render("join", { pageTitle, errorMessage:"Username or email is already taken."})
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
        })
    } catch(error) {
        return res.status(400).render("join", { pageTitle, errorMessage: error._message });
    }
    return res.redirect("/login");
}

export const login = (req, res) => res.render("login", {  pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage:"An account with this username does not exist."});
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).render("login", { pageTitle, errorMessage:"Wrong password."});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/")
}

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
};

export const profile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.render("profile", { pageTitle : "Profile", user });
}


export const getEdit = (req, res) => {
    const user = req.session.user;
    return res.render("edit-profile", { pageTitle : "Edit Profile", user})
}

export const postEdit = async (req, res) => {
    const { 
        session: { 
            user : { _id } 
        }, 
        body: { name, email, bio }, 
        file,
    } = req;
    const user = await User.findById(_id);
    try {
        await User.findByIdAndUpdate(_id, {
            avatar : file ? file.location : user.avatar,
            name,
            email,
            bio,    
        })
        req.session.user = {
            ...req.session.user,
            avatar : file ? file.location : user.avatar,
            name,
            email,
            bio,  
        }
        return res.redirect(`/users/${_id}`)
    }
    catch(error) {
        return res.redirect('/') //?????? ?????????
    }
}

export const getChangePassword = (req, res) => {
    return res.render("change-password", { pageTitle : "Change password"});
}

export const postChangePassword = async (req, res) => {
    const { 
        session: { 
            user : { _id, password } 
        }, 
        body: { currentPassword, newPassword, newPassword2 }, 
    } = req;
    const ok = await bcrypt.compare(currentPassword, password);
    if (!ok) {
        return res.status(400).render("change-password", { pageTitle : "Change password", errorMessage: "Current Password is wrong."});
    }
    if (newPassword !== newPassword2) {
        return res.status(400).render("change-password", { pageTitle : "Change password", errorMessage: "Password does not match."});
    }
    const user = await User.findById(_id);
    user.password = newPassword
    user.save()
    return res.redirect("/users/logout")
}


