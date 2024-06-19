import Product from "../models/Product.js";

export const transactions = async (req, res) => {
  let { page = 1, perPage = 10, search = "e", month = "03" } = req.query;
  const regex = new RegExp(search, "i");
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const query = {
    dateOfSale: { $gte: startDate, $lt: endDate },
  };
  page = parseInt(page);
  perPage = parseInt(perPage);

  if (search !== "") {
    query.$or = [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { priceStr: { $regex: regex } },
    ];
  }

  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          priceStr: { $toString: "$price" },
        },
      },
      { $match: query },

      { $project: { priceStr: 0 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);
    const total = await Product.countDocuments(query);
    res.json({ products, total, page, perPage });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const statistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const totalSales = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Product.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: true,
    });
    const totalNotSoldItems = await Product.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: false,
    });

    res.json({
      totalAmount: totalSales[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const barChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const ranges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const barData = await Promise.all(
      ranges.map(async ({ range, min, max }) => {
        const count = await Product.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: min, $lt: max },
        });
        return { range, count };
      })
    );
    res.json(barData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const pieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const pieData = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(pieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const combined = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const totalSales = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Product.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: true,
    });
    const totalNotSoldItems = await Product.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: false,
    });

    const ranges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const barData = await Promise.all(
      ranges.map(async ({ range, min, max }) => {
        const count = await Product.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: min, $lt: max },
        });
        return { range, count };
      })
    );

    const pieData = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      statistics: {
        totalAmount: totalSales[0]?.totalAmount || 0,
        totalSoldItems,
        totalNotSoldItems,
      },
      barChart: barData,
      pieChart: pieData,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
