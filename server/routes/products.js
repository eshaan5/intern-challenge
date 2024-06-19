import express from "express";
import { seedDatabase } from "../seed.js";
import { transactions, statistics, barChart, pieChart, combined } from "../controllers/product.js";

const router = express.Router();

router.get("/initialize", async (req, res) => {
  await seedDatabase();
  res.send("Database initialized");
});
router.get("/transactions", transactions);
router.get("/statistics", statistics);
router.get("/bar-chart", barChart);
router.get("/pie-chart", pieChart);
router.get("/combined", combined);

export default router;
