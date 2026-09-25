import { Router, type IRouter } from "express";
import healthRouter from "./health";
import executeCppRouter from "./execute-cpp";
import vivaRouter from "./viva";

const router: IRouter = Router();

router.use(healthRouter);
router.use(executeCppRouter);
router.use("/viva", vivaRouter);

export default router;
