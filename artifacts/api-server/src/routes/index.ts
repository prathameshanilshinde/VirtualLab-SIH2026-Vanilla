import { Router, type IRouter } from "express";
import healthRouter from "./health";
import executeCppRouter from "./execute-cpp";

const router: IRouter = Router();

router.use(healthRouter);
router.use(executeCppRouter);

export default router;