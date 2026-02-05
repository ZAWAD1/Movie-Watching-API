import { prisma } from "../config/prisma.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";

//Register controller
const register =async (req, res) => {

    const { name, email, password } = req.body;

    //Check if users exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });
    if( userExists ){
        return  res.status(400).json({ message: "User already exists" });
    }

    //passwrod hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        },
    });
    
    //Generate a token
    const token = generateToken(user.id, res);

    //respond with success for user creation
    //res.status(201).json({ message: "User registered successfully", user: user , token: token, userId: user.id });
    res.status(201).json({
        status: "success",
        data:{
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            }
        }
    })

};


//login controller
const login = async (req, res) => {
    
    const { email, password } = req.body;

    //Check if user exists
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    //Compare passowrd
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    //Generate a token
    const token = generateToken(user.id, res);

    //Respond with token
    res.status(200).json({ 
        message: "Login successful", 
        token: token , 
        userId: user.id 
    });
};

//Logout controller 
const logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

export { register, login, logout };