// Ambient module declarations for packages that have no @types.
// This file must be a script (no top-level import/export) for the declarations to be globally visible.

declare module 'express-ejs-layouts' {
  import { RequestHandler } from 'express';
  const expressLayouts: RequestHandler;
  export = expressLayouts;
}

declare module 'node-virustotal' {
  interface VTRequest {
    domainLookup(domain: string, callback: (err: Error | null, res: string) => void): void;
  }
  interface VTAPI {
    setKey(key: string): VTRequest;
  }
  export function makeAPI(): VTAPI;
}

declare module 'child-process-promise' {
  interface ChildProcessResult {
    stdout: string;
    stderr: string;
  }
  export function exec(command: string): Promise<ChildProcessResult>;
}

declare module 'password-generator' {
  function generatePassword(length: number, memorable?: boolean): string;
  export = generatePassword;
}
