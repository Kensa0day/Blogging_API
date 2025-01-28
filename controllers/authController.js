import Users from "../models/userModel.js"
import { hashString, createJWT, compareString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";


export const register = async(req, res, next) => {
    try{
        const {firstName, lastName, email, password, image, accountType, provider} = req.body;

        if(!(firstName || lastName || email || password)) {
            return next("Provide Required fields")
        }

        if (accountType === "Writer" && !image)
            return next("Please provide profile picture");

        const userExist = await Users.findOne({ email });

        if(userExist) {
            return next("Email already exist")
        }

        const hashPassword = await hashString(password)
        const user = await Users.create({
            name: firstName + " " + lastName,
            email, password: !provider ? hashPassword : "",
            image, accountType, provider
        })

        user.password = undefined
        const token = createJWT(user._id)

        // send email writer
        if (accountType === "Writer") {
            sendVerificationEmail(user, res, token);
        } else {
            res.status(201).json({
                success: true,
                message: "Account Created",
                user,
                token,
            })
        }




    } catch(error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const googleSignup = async(req, res, next) => {
    try{
        const { name, email, image, emailVerified } = req.body;

        const userExist = await Users.findOne({ email });

        if (userExist) {
            next("Email Address already exists. Try Login");
            return;
          }
      
          const user = await Users.create({
            name,
            email,
            image,
            provider: "Google",
            emailVerified,
          });
      
          user.password = undefined;
      
          const token = createJWT(user?._id);
      
          res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
            token,

          });

    } catch(error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const login = async(req, res, next) => {
    try{

        const {firstName, email, password, image, accountType, provider , id} = req.body;
         if (!email) {
            return next("please provide user credentials")
         }

         const user = await Users.findOne({ email }).select("+password")

         if (!user) {
            return next("Invail Email/Password")
         }

         if(user.provider === "Google" && !password) {
            const token = createJWT(user?._id);
            return res.status(201).json({
                success: true,
                message: "Login successfully",
                user,
                token,
         }) 
         
    }

    //Bandingkan Password

    const isMatch = await compareString(password, user.password);

    if (!isMatch) {
        return next('Invalid email/password')
    }

    if (user?.accountType === "Writer" && !user?.emailVerified) {
        return next("Verifikasi Email Anda")
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
    //   id: user?._id,
    //   user: {
    //     Users,
    //   },

      token,
    });

    } catch(error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}