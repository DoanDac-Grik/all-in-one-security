// export {} makes this file a module so the declare module below is a proper
// augmentation, not a replacement of the existing express-serve-static-core types.
export {};

declare module 'express-serve-static-core' {
  interface Request {
    fileValidationError?: string;
  }
}
