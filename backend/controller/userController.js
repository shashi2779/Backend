// represent -> collection
const FooduserModel = require('../model/userModel')

// *************************controller function**********************

async function getAllUsersController(req, res) {
    try {
      let users = await FooduserModel.find();
      //to send json data
      res.json(users)
    } catch (err) {
      res.end(err.message);
    }
  }
  
  
  async function profileController(req, res) {
    // user k profile ka data show kiye
    try {
      const userId = req.userId;
      const user = await FooduserModel.findById(userId);
      res.json({
        data: user,
        message: "Data about logged In user is send"
      })
    } catch (err) {
      res.end(err.message)
    }
  }


module.exports = {
    profileController : profileController,
    getAllUsersController : getAllUsersController
}  
