import bcryptjs from "bcryptjs";
import { status } from "init";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: "invalid email" });
    }

    const existingUserByEmail = await user.findOne({ email: email });

    if (existingUserByEmail) {
      return status(400).json({
        success: false,
        message: "email already exits",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new user({
      email,
      password: hashedPassword,
      image,
      username,
    });
    generateTokenSetCookie(newuser._id, res);
    await newuser.save();
    return res.status(201).json({
      success: true,

      user: {
        ...newuser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in signup controller" , error.message);
    res.status(500).json({sucess : false , message : "there is some internal error"});
  }
}

export async function login () {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }
    
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: false, message: "Invalid credentials" });
            }
    
            const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    
            if (!isPasswordCorrect) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }
    
            generateTokenAndSetCookie(user._id, res);
    
            res.status(200).json({
                success: true,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (error) {
            console.log("Error in login controller", error.message);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    
    export async function logout(req, res) {
        try {
            res.clearCookie("jwt-netflix");
            res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            console.log("Error in logout controller", error.message);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    
    export async function authCheck(req, res) {
        try {
            console.log("req.user:", req.user);
            res.status(200).json({ success: true, user: req.user });
        } catch (error) {
            console.log("Error in authCheck controller", error.message);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

