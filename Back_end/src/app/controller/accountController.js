 const Rep= require('../repository/accountRep')
 class accController{

    async login(req,res){
        try{
            const username = req.body.data.username;
            const password = req.body.data.password;
            console.log(username)
            var exist = await Rep.login(username,password)
            if(!exist){
                return  res.status(400).json({message:'not found'})
            }
             
            res.status(200).json(exist)

        }
        catch(error)
        {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

 }
 module.exports = new accController()