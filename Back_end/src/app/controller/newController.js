// controller/newsController.js
const newsRep = require('../repository/newsRep');

class newsController {

  async getAll(_, res) {
    try {
      const data = await newsRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.params.id;
      console.log(id)
      const data = await newsRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: ' not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async create(req, res) {
    try {
      // Lấy dữ liệu từ request body hoặc bất kỳ nguồn dữ liệu nào khác
      const newsData = req.body;
      const file = req.files?.Image;
      const newnews = await newsRep.create(newsData);
      const Id_news = newnews.id;
      newsData.Id_news = Id_news;
      if( file != undefined && file !=null){
        await newsRep.fileUpload(Id_news, file);
      }  
      res.status(201).json({
        message: ' created successfully',
        news: newnews,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating :', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.body.Id;
    const Data = req.body;
    const file = req.files?.Image; 
    console.log(req.body)// Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updated = await newsRep.update(id, Data);

        await newsRep.fileUpload(id, file);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await newsRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: ' not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async  searchAndPaginate(req, res) {
    try {
      const { keyword, page, pageSize } = req.query;
      const { count, rows } = await newsRep.searchNews(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}

module.exports = new newsController();
