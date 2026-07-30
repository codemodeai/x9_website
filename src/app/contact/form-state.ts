/**
 * Form state lives here, NOT in actions.ts.
 *
 * A "use server" module may only export async functions — exporting a plain
 * object like INITIAL_STATE from it throws at module evaluation:
 *   "A 'use server' file can only export async functions, found object."
 * Types are erased so they would be fine, but the const is not. Keeping both
 * here means the client can import them without pulling in the server module.
 */

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what the user typed. */
  values?: Record<string, string | string[]>;
}

export const INITIAL_STATE: FormState = { status: "idle" };
