// controller/productsController.js
const productsRep = require('../repository/productRep');
const priceRep=require('../repository/priceRep');
const sizerep=require('../repository/sizeRep');
const ColorRep=require('../repository/colorRep');




class productsController {

  async getAll(_, res) {
    try {
      const data = await productsRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.params.id;
    
      const data = await productsRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: 'products not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async getcategories(req, res) {
    try {
      const { id, page, pageSize } = req.query;
      const { count, rows } = await productsRep.getcategories(id, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async getnewproduct(req, res) {
    try {
      const {  page, pageSize } = req.query;
      const { count, rows } = await productsRep.getNewestProducts( page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async create(req, res) {
    try {
      // Lấy dữ liệu từ request body hoặc bất kỳ nguồn dữ liệu nào khác
      const productsData = req.body;
      const file = req.files.Image;
      const newproducts = await productsRep.Create(productsData);
      const Id_product = newproducts.id;
      productsData.Id_product = Id_product;
      await priceRep.create(productsData)
      await sizerep.create(productsData)
      await ColorRep.create(productsData)
      await productsRep.fileUpload(Id_product, file);
      res.status(201).json({
        message: 'products created successfully',
        products: newproducts,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating products:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }
  // async  Fileupload(req, res) {
  //   try {
  //     const id = req.productId || parseInt(req.body.id);
  //     const file = req.files.file;
  //     // console.log("file",file)
  //     const data = await productsRep.fileUpload(id, file);
  //     res.status(200).json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal Server Error', error: error.message });
  //   }
  // }

  async update(req, res) {
    const productsid = req.body.Id;
    const id_Color =req.body.Id_Price;
    const id_Size =req.body.Id_Color;
    const id_Price =req.body.Id_Price;
    const updatedData = req.body;
    console.log(updatedData)
    const file = req.files?.Image; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updatedproducts = await productsRep.update(productsid, updatedData);

      await priceRep.update(id_Price,updatedData)
      await sizerep.update(id_Size,updatedData)
      await ColorRep.update(id_Color,updatedData)

      if( file != undefined && file !=null){
        await productsRep.fileUpload(productsid, file);
      }   
      res.status(200).json(updatedproducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const data = await productsRep.delete(id);
      await sizerep.delete(id);
      await priceRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: 'products not found' });
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
      const { count, rows } = await productsRep.searchAndPaginate(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
 
}


module.exports = new productsController();
