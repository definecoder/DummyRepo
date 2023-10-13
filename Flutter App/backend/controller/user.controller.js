const UserServices = require('../services/user.service');
exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { username, email, password } = req.body;
        // const duplicate = await UserServices.getUserByEmail(email);
        // if (duplicate) {
        //     throw new Error(`UserName ${email}, Already Registered`)
        // }
        const response = await UserServices.registerUser(username, email, password);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // if (!email || !password) {
        //     throw new Error('Parameter are not correct');
        // }
         let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }
        // else{
        //     console.log("user existttttttt");
        // }

         const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            console.log("pass doesn't matchhhhhhh");
            throw new Error(`email or Password does not match`);
        }
        else{
            console.log("pass matchhhhhhh");
        }

        //create token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

         res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}