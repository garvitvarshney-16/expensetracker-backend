import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { User } from "./models/user.model.js";
import { Expense } from "./models/expense.model.js";
import UserRoute from "./routes/user.routes.js";
import { Budget } from "./models/budget.model.js";
import { Saving } from "./models/saving.model.js";
import { Transaction } from "./models/transaction.model.js";
import { Income } from "./models/income.model.js";
import IncomeRoute from "./routes/income.routes.js";
import ExpenseRoute from "./routes/expense.routes.js";
import SavingRoute from "./routes/saving.routes.js";
import TransactionRoute from "./routes/transaction.routes.js";
import { MonthlyExpenseGoal } from "./models/monthlyexpensegoal.model.js";
import MonthlyExpenseGoalRoute from "./routes/monthlyexpensegoal.routes.js"
import AIModelRoute from "./routes/aimodel.routes.js"
const app = Express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(Express.json({ limit: "16kb" }));
app.use(Express.urlencoded({ extended: true, limit: "16kb" }));
app.use(Express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/income", IncomeRoute);
app.use("/api/v1/expense", ExpenseRoute);
app.use("/api/v1/saving", SavingRoute);
app.use("/api/v1/transaction", TransactionRoute);
app.use("/api/v1/monthlyexpensegoal", MonthlyExpenseGoalRoute)
app.use("/api/v1", AIModelRoute)

// // DB model creation
User.sync();
Expense.sync({ alter: true });
Budget.sync({ alter: true });
Saving.sync({ alter: true });
Transaction.sync({ alter: true });
Income.sync({ alter: true });
MonthlyExpenseGoal.sync({ alter: true });

export { app };
