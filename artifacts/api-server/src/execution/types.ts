export interface HeapNode {
  data: unknown;
  next: string | null;
}

export interface ExecutionState {
  step: number;
  line: number;
  code: string;
  variables: Record<string, unknown>;
  stack: Record<string, unknown>;
  heap: Record<string, HeapNode>;
  pointers: Record<string, string | null>;
  output: string;
  error: string | null;
}