import { Router, type IRouter } from "express";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const router: IRouter = Router();

const execFileAsync = promisify(execFile);

type ExecutionState = {
  step: number;
  line: number;
  code: string;
  variables: Record<string, string>;
  stack: Record<string, string>;
  heap: Record<
    string,
    {
      data: number;
      next: string | null;
    }
  >;
  pointers: Record<string, string | null>;
  output: string;
  error: string | null;
};

function createLinkedListStates(code: string): ExecutionState[] {
  const lines = code
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const states: ExecutionState[] = [];

  let step = 0;

  let first: string | null = null;
  let second: string | null = null;
  let head: string | null = null;

  const heap: ExecutionState["heap"] = {};

  const addState = (
    line: number,
    lineCode: string,
  ) => {
    states.push({
      step,
      line,
      code: lineCode,
      variables: {
        head: head ?? "nullptr",
        first: first ?? "nullptr",
        second: second ?? "nullptr",
      },
      stack: {
        head: head ?? "nullptr",
        first: first ?? "nullptr",
        second: second ?? "nullptr",
      },
      heap: JSON.parse(JSON.stringify(heap)),
      pointers: {
        head,
        first,
        second,
      },
      output: "",
      error: null,
    });

    step++;
  };

  // Initial state
  addState(
    1,
    "Node* head = nullptr;",
  );

  // first = new Node(10)
  first = "node_01";

  heap.node_01 = {
    data: 10,
    next: null,
  };

  addState(
    2,
    "Node* first = new Node(10);",
  );

  // head = first
  head = first;

  addState(
    3,
    "head = first;",
  );

  // second = new Node(20)
  second = "node_02";

  heap.node_02 = {
    data: 20,
    next: null,
  };

  addState(
    4,
    "Node* second = new Node(20);",
  );

  // second->next = head
  heap.node_02.next = head;

  addState(
    5,
    "second->next = head;",
  );

  // head = second
  head = second;

  addState(
    6,
    "head = second;",
  );

  return states;
}

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
    process.platform === "win32"
      ? "main.exe"
      : "main",
  );

  try {
    await mkdir(workDir, {
      recursive: true,
    });

    await writeFile(
      sourceFile,
      code,
      "utf8",
    );

    // Compile C++
    try {
      await execFileAsync(
        "g++",
        [
          sourceFile,
          "-std=c++17",
          "-O0",
          "-o",
          executableFile,
        ],
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
      const result = await execFileAsync(
        executableFile,
        [],
        {
          timeout: 5000,
          windowsHide: true,
          maxBuffer: 1024 * 1024,
        },
      );

      /*
       * Generate visualization states for the
       * linked-list practical.
       *
       * This is intentionally controlled for the
       * current SIH prototype.
       */
      const executionStates =
        createLinkedListStates(code);

      return res.json({
        success: true,
        output: result.stdout || "",
        error: result.stderr || null,
        executionStates,
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
    console.error(
      "C++ execution error:",
      error,
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Failed to execute C++ code.",
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