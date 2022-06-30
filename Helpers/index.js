const jwt = require("jsonwebtoken")

exports.apiResponse = (data={},message="",status=true) =>{
    return {
        data,
        message,
        status
    }
} 

exports.genrateToken = (user) => {
    const token = jwt.sign({ _id: user._id, email: user.email, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token
}