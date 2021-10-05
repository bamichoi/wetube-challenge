import User from "../models/User";
import bcrypt from "bcrypt";

export const join = (req, res) => res.render("join", { pageTitle: "Create Account"});
export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Create Account"
    if (password !== password2 ) {
        return res.status(400).render("join", { pageTitle, errorMessage:"Passwords do not match."})
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
            location,
        })
    } catch(error) {
        return res.status(400).render("join", { pageTitle, errorMessage: error._message });
    }
    

    return res.redirect("/login");
}
export const login = (req, res) => res.render("Login", {  pageTitle: "Login" });
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
    console.log(req.session)
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/")
}
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("Delete user");
export const logout = (req, res) => res.send("Logout");
export const profile = (req, res) => rew.send("Profile");
