const app = require('./app');
const dotEnv = require('dotenv');

// Load environment variables from the .env file
dotEnv.config({ path: './config.env' });

// Use environment variables for the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
