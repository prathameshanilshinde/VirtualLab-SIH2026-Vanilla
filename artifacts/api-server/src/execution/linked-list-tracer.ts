import type { ExecutionState, HeapNode } from "./types";

interface TracerContext {
  variables: Record<string, unknown>;
  stack: Record<string, unknown>;
  heap: Record<string, HeapNode>;
  pointers: Record<string, string | null>;
  nextNodeId: number;
}

function cloneState(
  context: TracerContext,
  step: number,
  line: number,
  code: string,
): ExecutionState {
  return {
    step,
    line,
    code,
    variables: { ...context.variables },
    stack: { ...context.stack },
    heap: Object.fromEntries(
      Object.entries(context.heap).map(([id, node]) => [
        id,
        { ...node },
      ]),
    ),
    pointers: { ...context.pointers },
    output: "",
    error: null,
  };
}

function createContext(): TracerContext {
  return {
    variables: {},
    stack: {},
    heap: {},
    pointers: {},
    nextNodeId: 1,
  };
}

function getNodeId(context: TracerContext): string {
  const id = `node_${String(context.nextNodeId).padStart(2, "0")}`;
  context.nextNodeId += 1;
  return id;
}

export function traceLinkedList(code: string): ExecutionState[] {
  const lines = code.split(/\r?\n/);
  const context = createContext();
  const states: ExecutionState[] = [];

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line || line.startsWith("//")) {
      return;
    }

    const lineNumber = index + 1;

    // Node* variable = nullptr;
    const nullDeclaration = line.match(
      /^Node\s*\*\s*(\w+)\s*=\s*nullptr\s*;$/,
    );

    if (nullDeclaration) {
      const [, variable] = nullDeclaration;

      context.variables[variable] = null;
      context.stack[variable] = null;
      context.pointers[variable] = null;

      states.push(
        cloneState(
          context,
          states.length,
          lineNumber,
          line,
        ),
      );

      return;
    }

    // Node* variable = new Node(value);
    const newNodeDeclaration = line.match(
      /^Node\s*\*\s*(\w+)\s*=\s*new\s+Node\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)\s*;$/,
    );

    if (newNodeDeclaration) {
      const [, variable, valueText] = newNodeDeclaration;
      const value = Number(valueText);
      const nodeId = getNodeId(context);

      context.heap[nodeId] = {
        data: value,
        next: null,
      };

      context.variables[variable] = nodeId;
      context.stack[variable] = nodeId;
      context.pointers[variable] = nodeId;

      states.push(
        cloneState(
          context,
          states.length,
          lineNumber,
          line,
        ),
      );

      return;
    }

    // pointer = anotherPointer;
    const pointerAssignment = line.match(
      /^(\w+)\s*=\s*(\w+)\s*;$/,
    );

    if (pointerAssignment) {
      const [, target, source] = pointerAssignment;

      if (
        Object.prototype.hasOwnProperty.call(
          context.pointers,
          target,
        ) &&
        Object.prototype.hasOwnProperty.call(
          context.pointers,
          source,
        )
      ) {
        const value = context.pointers[source];

        context.variables[target] = value;
        context.stack[target] = value;
        context.pointers[target] = value;

        states.push(
          cloneState(
            context,
            states.length,
            lineNumber,
            line,
          ),
        );
      }

      return;
    }

    // pointer->next = anotherPointer;
    const nextAssignment = line.match(
      /^(\w+)->next\s*=\s*(\w+)\s*;$/,
    );

    if (nextAssignment) {
      const [, target, source] = nextAssignment;

      const targetNodeId = context.pointers[target];
      const sourceNodeId = context.pointers[source];

      if (targetNodeId && context.heap[targetNodeId]) {
        context.heap[targetNodeId].next = sourceNodeId ?? null;

        context.pointers[`${target}.next`] =
          sourceNodeId ?? null;

        states.push(
          cloneState(
            context,
            states.length,
            lineNumber,
            line,
          ),
        );
      }

      return;
    }
  });

  return states;
}