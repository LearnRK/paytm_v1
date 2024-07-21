const express = require("express");
const middleware = require("./middleware");
const mongoose = require("mongoose");
const zod = require("zod");
const { Account } = require("../db");

const accountRouter = express.Router();
accountRouter.use(express.json());

const transerSchema = zod.object({
    to: zod.string(),
    amount: zod.number().positive(),
});

accountRouter.get("/", (req, res) => {
    return res.json({ msg: "Hello World from accountRouter" });
});

accountRouter.use(middleware);

accountRouter.get("/balance", async (req, res) => {
    try {
        const balance = (await Account.findOne({ userId: req.userId })).balance;
        return res.json({ balance });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

accountRouter.post("/transfer", async (req, res) => {
    const body = req.body;
    const { success } = transerSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({ msg: "Invalid request" });
    }

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
        session,
    );

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance",
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account",
        });
    }

    // Perform the transfer
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } },
    ).session(session);
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } },
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful",
    });
});

module.exports = accountRouter;
