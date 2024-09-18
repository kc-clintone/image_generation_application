import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import preview from '../assets/preview.png';

const CreatePost = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		prompt: '',
		photo: '',
	});
	const [processingImage, setProcessingImage] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm((prevForm) => ({ ...prevForm, prompt: randomPrompt }));
	};

	const generateImage = async () => {
		if (form.prompt) {
			try {
				setProcessingImage(true);
				const response = await fetch(
					'https://snapai-6mpe.onrender.com/api/v1/dalle',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': 'no-cors',
						},
						body: JSON.stringify({ prompt: form.prompt }),
					}
				);

				const data = await response.json();
				setForm((prevForm) => ({
					...prevForm,
					photo: `data:image/jpeg;base64,${data.photo}`,
				}));
			} catch (err) {
				alert(err);
			} finally {
				setProcessingImage(false);
			}
		} else {
			alert('Please provide a proper prompt');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true);
			try {
				const response = await fetch(
					'https://snapai-6mpe.onrender.com/api/v1/post',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': 'no-cors',
						},
						body: JSON.stringify(form),
					}
				);

				await response.json();
				alert('Posted');
				navigate('/');
			} catch (err) {
				alert(err);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Please generate an image with proper details');
		}
	};

	const isPhotoGenerated = !!form.photo;

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>
					Create Your Own
				</h1>
				<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
					Generate beautiful, imaginative, and unique pictures using SnapAI
					artificial image generator and share them with others in the
					community.
				</p>
			</div>

			<form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-5'>
					<FormField
						labelName="If you don't have an account, create an alias name."
						type='text'
						name='name'
						placeholder='Example: John Doe'
						value={form.name}
						handleChange={handleChange}
					/>

					<FormField
						labelName='Type a description of an image you want below, or use the surprise me button to generate something random.'
						type='text'
						name='prompt'
						placeholder='An Impressionist oil painting of sunflowers in a purple vase…'
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>

					<div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
						{isPhotoGenerated ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className='w-full h-full object-contain'
							/>
						) : (
							<img
								src={preview}
								alt='preview'
								className='w-9/12 h-9/12 object-contain opacity-40'
							/>
						)}

						{processingImage && (
							<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className='mt-5 flex gap-5'>
					{isPhotoGenerated ? (
						<button
							type='button'
							onClick={generateImage}
							className='text-white bg-gray-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							{processingImage ? 'Generating...' : 'Re-Generate'}
						</button>
					) : (
						<button
							type='button'
							onClick={generateImage}
							className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							{processingImage ? 'Generating...' : 'Generate'}
						</button>
					)}

					{isPhotoGenerated && (
						<button
							type='submit'
							className='text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
						>
							{loading ? 'Sharing...' : 'Share with the Community'}
						</button>
					)}
				</div>
			</form>
		</section>
	);
};

export default CreatePost;
