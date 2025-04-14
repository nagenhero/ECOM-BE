import { findToken } from "../models/sessions/sessionModel.js";
import { getUserByEmail } from "../models/users/userModel.js";
import { jwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    //1.Get token form req headers
    const token = req.headers.authorization;
    if (!token) {
      return next({
        statusCode: 401,
        message: "token is not provided",
      });
    }
    console.log("11", token);

    //2.find token of re header that is stored in session db
    const tokenFromDb = await findToken(token);
    if (!tokenFromDb) {
      return next({
        statusCode: 401,
        message: "token did not found in database",
      });
    }
    console.log("222", tokenFromDb);
    //3. if token is fetched and exist then verify token as{email:johna@gmail.com}
    const decodedData = await jwtVerify(tokenFromDb.token);
    // console.log("deocded data:", decodedData);
    //"If there's no email field in the decoded token (or if it's falsy),null,empty '',undefined, treat it as an error."
    //decodedData	     decodedData?.email	    !decodedData?.email	Condition runs?
    //{ email: 'a@b.com' }	'a@b.com'	          false	           ❌ No
    ////{ email: '' }          	''	             true         	✅ Yes
    ////{ email: null }	      null	             true           ✅ Yes
    //undefined	             undefined            true	        ✅ Yes
    //{}	                   undefined             true	       ✅ Yes

    if (!decodedData?.email) {
      return next({
        statusCode: 401,
        message:
          "invalaid token data or email cant be verified or invalid signature ",
      });
    }

    //4.As email is verified, then fetch the user data from user db as email matched
    const userData = await getUserByEmail(decodedData.email);
    if (userData) {
      req.userData = userData;

      // const userData = await getUserByEmail(decodedData.email);
      //5.after fetching the user details, attched in req and send back to next()
      next();
    } else {
      res.next({
        statusCode: 401,
        message: "Could not found the user for the given email",
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 401,
      message: error?.message || "Error: token is invalid",
    });
  }
};

export const isadmin = async (req, res, next) => {
  req.userData.role == "admin"
    ? next()
    : next({
        statusCode: 403,
        message: "Not authorized .Must be admin ",
      });
};
