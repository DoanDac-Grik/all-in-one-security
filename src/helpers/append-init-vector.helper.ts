import { Transform, TransformCallback, TransformOptions } from 'stream';

class AppendInitVect extends Transform {
  private initVect: Buffer;
  private appended: boolean;

  constructor(initVect: Buffer, opts?: TransformOptions) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  _transform(chunk: unknown, _encoding: BufferEncoding, cb: TransformCallback): void {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

export default AppendInitVect;
