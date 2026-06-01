import jwt from "jsonwebtoken";
import { ApiRes } from "../utils/apiRes";

const protect = async (req, res, next) => {

    const token = req.headers.authorization?.split("")[1];
    if(!token) throw new apiError(401, "Not authorized, no token");
    
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserActivation.findById(decodeToken.id).select("-password");
    } catch (error) {
        throw new apiError(401, "Token expired");
        
    }
    next();
}

const ownerOnly = async (req, res, next) => {
  if(req.user.role !== "owner"){
    throw new Error(401, "Only hostel owners can do this");
  }
  next();
}




