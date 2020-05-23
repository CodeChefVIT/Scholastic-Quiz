const JWT = require('jsonwebtoken')


module.exports = function (req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(400).send("Access Denied!")
    // if(req.user.isAdmin!=true) return res.status(400).send('not an admin')
    


    try{
        const verified =JWT.verify(token,process.env.JWT_TOKEN)
        req.user = verified
        
        
        if(req.user.user.isAdmin===true){
            console.log(req.user)
            next()
        }
        
        
    }catch(err){
        res.status(400).send(err)
    }
}