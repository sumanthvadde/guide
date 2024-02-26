const mongoose = require("mongoose");

const connectDB = async () => {
	const conn = await mongoose.connect(
		"mongodb+srv://sumanth:sumanth@cluster0.2vscjkp.mongodb.net/?retryWrites=true&w=majority"
	);

	console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
