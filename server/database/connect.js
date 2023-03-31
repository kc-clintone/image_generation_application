import mongoose from 'mongoose';

const connectDB = (url) => {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(url)
		.then(() => console.log('******Success, connected to database******'))
		.catch((err) => {
			console.error('======An error occured, please try aggain!======');
			console.error(err);
		});
};

export default connectDB;
