import mongoose from 'mongoose';

async function connect(): Promise<void> {
  try {
    const uri = process.env.MONGODB_URI ?? '';
    await mongoose.connect(uri);
    console.log('Connect successfully');
  } catch {
    console.log('Connect failed');
  }
}

export default { connect };
