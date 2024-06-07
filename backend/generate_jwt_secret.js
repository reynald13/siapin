const crypto = require('crypto');

// Generate a random 64-byte string and convert it to hex format
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Print the generated secret to the console
console.log(jwtSecret);