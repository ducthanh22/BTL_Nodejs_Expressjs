 const Rep= require('../repository/accountRep')
 class accController{

    async login(req,res){
        try{
            const username = req.body.data.username;
            const password = req.body.data.password;
            console.log(req.body)
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

    async create(req, res) {
        try {
          // Lấy dữ liệu từ request body hoặc bất kỳ nguồn dữ liệu nào khác
          const Data = req.body;
          const newAccount = await Rep.create(Data);
          res.status(201).json({
            message: ' created successfully',
            Account: newAccount,
          });
        } catch (error) {
          // Xử lý lỗi và trả về thông báo lỗi
          console.error('Error creating category:', error);
          res.status(500).json({
            error: error.message,
          });
        }
      }

 }
 module.exports = new accController()