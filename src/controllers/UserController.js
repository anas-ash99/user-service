import User from "../models/User.js";
import bcrypt from "bcrypt"


export const createNewUser = async (req, res)=>{
    try {
        const saltRound = 10
        let user = req.body

        const decodedAuthorization = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
        const email = decodedAuthorization.slice(0, decodedAuthorization.indexOf(":"))
        const password = decodedAuthorization.slice(decodedAuthorization.indexOf(":") + 1)
        user.email = email
        user.password = password
        console.log(user.password);
        const checkUser = await User.findOne({email: user?.email?.toLowerCase()});
        if(checkUser){
            res.status(406).json({message: "User already exsit"})
        }else{
            user.password = await bcrypt.hash(user.password, saltRound)
            console.log(user.password);
            user.createdAt = new Date()
            user = new User(user)
            user.save()
            res.status(200).json({message: "User created", ...User._doc})
        }






    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Something went wrong"})
    }


}



export const signInUser = async(req, res)=>{

    try {

        var decodedAuthorization  = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString()
        const email = decodedAuthorization.slice(0, decodedAuthorization.indexOf(":"))
        const password = decodedAuthorization.slice(decodedAuthorization.indexOf(":") + 1)

        const user = await User.findOne({email: email?.toLowerCase()})
        if (user) {

            const chekValidation = await bcrypt.compare(password, user.password)

            if (chekValidation) {
                res.status(200).json({message: "Login success",user:user._doc})
            } else {
                res.status(200).json({message: "wrong password", user:null})
            }


            //    console.log(chekValidation);


        }else{
            res.status(200).json({message: "User doesn't exist", user:null})

        }




    } catch (error) {
        res.status(400).json({message: "Something went wrong", user:null})
        console.log(error);
    }





}

export const welcome = async (req, res) =>{
    try {
        res.status(200).send("welcome to the user service")
    } catch (error) {
        res.status(400).json({message: "Something went wrong", user:null})
        console.log(error);
    }
}
const decodeBasicAuth = async (header)=>{

    var decodedAuthorization  = Buffer.from(header.authorization.split(" ")[1], 'base64').toString()
    const email = decodedAuthorization.slice(0, decodedAuthorization.indexOf(":"))
    const password = decodedAuthorization.slice(decodedAuthorization.indexOf(":") + 1)
    return {
        email: email,
        password: password
    }

}