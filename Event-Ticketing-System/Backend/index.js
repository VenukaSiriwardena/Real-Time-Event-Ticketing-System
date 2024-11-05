import express from 'express';
import Configuration from './Configuration.js';
const app = express();
const PORT = 3000;
const config = new Configuration();
config.configData();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
