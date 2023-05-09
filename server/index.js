import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/connect.js';

import postRoutes from './routes/postRoutes.js';
import serverRoutes from './routes/serverRoutes.js';

/* ======configure env====== */
dotenv.config();
const port = 'https://snapai-6mpe.onrender.com';
/* ======initialise application===== */

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

/* =====endpoints===== */
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', serverRoutes);

/* =====run server===== */

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(port, () =>
			console.log(`Server running on port: http://localhost:${port}`)
		);
	} catch (error) {
		console.log('Something went wrong!');
	}
};

startServer();
