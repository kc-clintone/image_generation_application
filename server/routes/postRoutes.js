// import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { body, validationResult } from 'express-validator';

import Post from '../database/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate request body for create post route
const validateCreatePost = [
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('prompt').trim().notEmpty().withMessage('Prompt is required'),
	body('photo').trim().notEmpty().withMessage('Photo is required'),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res.status(400).json({ success: false, errors: errorMessages });
	}
	next();
};

router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: 'Fetching posts failed, please try again',
		});
	}
});

router.post(
	'/',
	validateCreatePost,
	handleValidationErrors,
	async (req, res) => {
		try {
			const { name, prompt, photo } = req.body;
			const photoUrl = await cloudinary.uploader.upload(photo);

			const newPost = await Post.create({
				name,
				prompt,
				photo: photoUrl.url,
			});

			res.status(200).json({ success: true, data: newPost });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				message: 'Unable to create a post, please try again',
			});
		}
	}
);

export default router;
