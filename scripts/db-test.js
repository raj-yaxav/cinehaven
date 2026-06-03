const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set. Create a .env.local with MONGODB_URI.');
  process.exit(1);
}

mongoose
  .connect(uri, { dbName: 'cinehaven' })
  .then(() => {
    console.log('✅ MongoDB connection successful');
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
