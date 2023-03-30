const userRouter = express.Router();
const {getAllUsersController,profileController} = require("../controller/userController")
const {protectRoute} = require("../controller/authController");

// users -> get all the users ( sare users la kar de deta hai ) -> sensitive route -> protect route -> logged In i will only allow that person
userRouter.get("/users", protectRoute, getAllUsersController)

// profile page
userRouter.get("/user", protectRoute, profileController)


module.exports = userRouter;