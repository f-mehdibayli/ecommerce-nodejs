dotenv.config();

export const config = {
    port: process.env.PORT || 6000,
    mongo_url: process.env.MONGO_URI,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET
}