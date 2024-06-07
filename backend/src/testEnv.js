require('dotenv').config({ path: '../.env' });  // Adjust path to the .env file
console.log('MONGO_URI:', process.env.MONGO_URI);