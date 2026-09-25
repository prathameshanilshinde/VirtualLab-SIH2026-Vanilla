import { Router, type IRouter } from "express";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { traceLinkedList } from "../execution/linked-list-tracer";

const router: IRouter = Router();

const execFileAsync = promisify(execFile);

router.post("/execute-cpp", async (req, res) => {
  const { code } = req.body ?? {};

  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      success: false,
      error: "C++ code is required.",
      executionStates: [],
    });
  }

  const workDir = path.join(
    os.tmpdir(),
    `virtuallab-cpp-${randomUUID()}`,
  );

  const sourceFile = path.join(workDir, "main.cpp");
  const executableFile = path.join(
    workDir,
    process.platform === "win32" ? "main.exe" : "main",
  );

  try {
    await mkdir(workDir, { recursive: true });

    await writeFile(sourceFile, code, "utf8");

    // Compile C++
    try {
      await execFileAsync(
        "g++",
        [sourceFile, "-std=c++17", "-O0", "-o", executableFile],
        {
          timeout: 15000,
          windowsHide: true,
          maxBuffer: 1024 * 1024,
        },
      );
    } catch (compileError: any) {
      const stderr =
        compileError?.stderr ||
        compileError?.stdout ||
        compileError?.message ||
        "Compilation failed.";

      return res.status(200).json({
        success: false,
        error: String(stderr),
        executionStates: [],
        output: "",
      });
    }

    // Run compiled program
    try {
      const result = await execFileAsync(executableFile, [], {
        timeout: 5000,
        windowsHide: true,
        maxBuffer: 1024 * 1024,
      });

      const executionStates = traceLinkedList(code);
const traceSupported = executionStates.length > 0;

return res.json({
  success: true,
  output: result.stdout || "",
  error: result.stderr || null,
  executionStates,
  traceSupported,
});
    } catch (runtimeError: any) {
      const stderr =
        runtimeError?.stderr ||
        runtimeError?.stdout ||
        runtimeError?.message ||
        "Program execution failed.";

      return res.status(200).json({
        success: false,
        error: String(stderr),
        output: runtimeError?.stdout || "",
        executionStates: [],
      });
    }
  } catch (error: any) {
    console.error("C++ execution error:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Failed to execute C++ code.",
      executionStates: [],
    });
  } finally {
    try {
      await rm(workDir, {
        recursive: true,
        force: true,
      });
    } catch {
      // Ignore temporary directory cleanup errors.
    }
  }
});

export default router;