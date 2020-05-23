const JWT = require('jsonwebtoken')


module.exports = function (req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(400).send("Access Denied!")

    try{
        const verified =JWT.verify(token,process.env.JWT_TOKEN)
        req.user = verified
        console.log(req.user)
        next()
    }catch(err){
        res.status(400).send(err)
    }
}