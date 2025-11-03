import User from '../models/auth.model.js';
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }

        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const accessToken = generateAccessToken(user, res);
        const refreshToken = generateRefreshToken(user, res);

        res.status(200).json({ 
            message: 'Login successful',
            accessToken,
            refreshToken,
         user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
         }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });    
    }
}

// export const register = async (req, res) => {
//     try {
//         const {
//             firstname,
//             lastname,
//             email,
//             password,
//             roles,
//             phone,
//             isStore,
//             storeName,
//             voen,
//             storeDescription
//         } = req.body;

//         const user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         let newUser;

//         if (!isStore) {
//             newUser = new User({ firstname, lastname, email, phone, password });
//         } else {
//             if ((isStore && !storeName) || !voen || !storeDescription) {
//                 return res.status(400).json({ message: 'Please fill all fields' });
//             }

//             newUser = new User({
//                 firstname,
//                 lastname,
//                 email,
//                 password,
//                 roles,
//                 phone,
//                 isStore,
//                 storeName,
//                 voen,
//                 storeDescription
//             });
//         }

//         const accessToken = generateAccessToken(newUser, res);
//         const refreshToken = generateRefreshToken(newUser, res);
//         newUser.refreshToken = refreshToken;

//         await User.create(newUser);
//         res.status(201).json({ accessToken, refreshToken });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            roles,
            phone,
            isStore,
            storeName,
            voen,
            storeDescription
        } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 1. newUser-u BLOKDAN KƏNARDA ELAN EDİN
        let newUser;

        if (!isStore) {
            // 2. new User obyektini mənimsədin (const/let yoxdur)
            newUser = new User({ firstname, lastname, email, phone, password });
        } else {
            if ((isStore && !storeName) || !voen || !storeDescription) {
                return res.status(400).json({ message: 'Please fill all fields' });
            }

            // 3. new User obyektini mənimsədin (const/let yoxdur)
            newUser = new User({
                firstname,
                lastname,
                email,
                password,
                roles,
                phone,
                isStore,
                storeName,
                voen,
                storeDescription
            });
        }

        const accessToken = generateAccessToken(newUser, res);
        const refreshToken = generateRefreshToken(newUser, res);
        newUser.refreshToken = refreshToken;

        // Qeyd: Yəqin ki, siz User.create(newUser) əvəzinə await newUser.save(); etməlisiniz
        await newUser.save(); // VƏ YA await User.create(newUser);

        res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken
        if (!token) {
            res.status(401).josn({ message: "No toek provided" })
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.id)

        if (!user) return res.status(404).json({ error: "User not found" })
        if (user.refreshToken !== token) return res.status(403).json({ error: "Invalid token" })

        const newAccessToken = generateAccessToken(user, res)
        res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        res.status(403).json({ message: "Error while refreshing token" })
    }
}

export const logout = async (req, res) => {
    try {
       //middlware-dən gələn istifadəçi məlumatını əldə edin
        const user = await User.findById(req.user.id);
        if(user){
            user.refreshToken = null;
            await user.save();
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}