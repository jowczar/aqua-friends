import express from "express";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/helloWorld", async (req, res) => {
  res.send("Hello World!");
});

export default router;
