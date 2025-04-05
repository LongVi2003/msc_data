import express from "express";
import Bid from "../models/bidModel.js";

const router = express.Router();

// API lấy dữ liệu tổng hợp theo lĩnh vực, nhà đầu tư, vendor
router.get("/", async (req, res) => {
  try {
    const bidStats = await Bid.findAll({
      attributes: ["fieldCategory", [Bid.sequelize.fn("SUM", Bid.sequelize.col("bidPrice")), "totalPrice"]],
      group: ["fieldCategory"],
    });

    const investorStats = await Bid.findAll({
      attributes: ["investorName", [Bid.sequelize.fn("SUM", Bid.sequelize.col("bidPrice")), "totalPrice"]],
      group: ["investorName"],
      order: [[Bid.sequelize.fn("SUM", Bid.sequelize.col("bidPrice")), "DESC"]],
      limit: 10,
    });

    const vendorStats = await Bid.findAll({
      attributes: ["vendorName", [Bid.sequelize.fn("SUM", Bid.sequelize.col("bidPrice")), "totalPrice"]],
      group: ["vendorName"],
      order: [[Bid.sequelize.fn("SUM", Bid.sequelize.col("bidPrice")), "DESC"]],
      limit: 10,
    });

    res.json({ bidStats, investorStats, vendorStats });
  } catch (error) {
    console.error("❌ Lỗi API:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

export default router;