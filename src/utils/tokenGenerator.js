import jwt from 'jsonwebtoken';

export const generateToken = (user, res = {}) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: '5m' 
        });

        res.cookie(
            'accessToken', accessToken, {
            httpOnly: true,
            maxAge: 5*60*1000, // 5 minutes
        });
    
    return accessToken;
}

export const generateRefreshToken = (user, res = {}) => {
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: '7d' 
        });

        res.cookie(
            'refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000, // 7 days
        });

    return refreshToken;
}