import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from './database/connect.js';

import postRoutes from './routes/postRoutes.js';
import serverRoutes from './routes/serverRoutes.js';

/* ======configure env====== */
dotenv.config();
const channel = process.env.PORT;

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
		db(process.env.MONGODB_URL);
		app.listen(channel, () =>
			console.log(`Server running on port http://localhost:${channel}`)
		);
	} catch (error) {
		console.log(error);
	}
};

startServer();
