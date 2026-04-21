import jwt from "jsonwebtoken"; 
 
const auth = (req, res, next) => { 
  const token = req.headers.authorization; // get token from headers
 
  if (!token) return res.status(401).json("No token"); // no token provided
 
  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
    req.user = decoded; // attach user data
    next(); // proceed
  } catch { 
    res.status(401).json("Invalid token"); // invalid token
  } 
}; 
 
export default auth; // export middleware