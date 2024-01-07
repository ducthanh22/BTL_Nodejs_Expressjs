const Rep = require('../repository/ThongkeRep');

class thongkeController {

    async Thongke(req,res){
        console.log(req.query)
        const{startDate, endDate}=req.query;
        const data = await Rep.getStatistics(startDate, endDate);
        res.status(200).json(data)
    }
    async  getMonthlyRevenue(req, res) {
        try {
            const{startDate, endDate}=req.query;
            console.log(req.body)
          const monthlyRevenue = await Rep.getMonthlyRevenue(startDate, endDate);
          res.json(monthlyRevenue);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
}

module.exports=new thongkeController()