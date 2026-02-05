import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    //Token object payload
    const payload = { id: userId };

    //payload convertion
    const token = jwt.sign(payload, process.env.JWT_SECRET, 
    { 
        expiresIn: process.env.JWT_EXPIRES_IN 
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });     

    return token;
}
export default generateToken;