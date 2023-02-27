import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const CLUB_NAME = process.env.CLUB_NAME || "ahauser-maidy-dogs";
export const CLUB_SHORT_NAME = process.env.CLUB_SHORT_NAME || "ASV";