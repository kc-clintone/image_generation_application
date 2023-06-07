import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post) => <Card key={post._id} {...post} />);
	}

	return (
		<h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);

	const [searchText, setSearchText] = useState('');
	const [searchedResults, setSearchedResults] = useState(null);

	const fetchPosts = async () => {
		setLoading(true);

		try {
			const response = await fetch(
				'https://snapai-6mpe.onrender.com/api/v1/post',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'no-cors',
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				setAllPosts(result.data.reverse());
			}
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const searchResult = allPosts.filter(
			(item) =>
				item.name.toLowerCase().includes(searchText.toLowerCase()) ||
				item.prompt.toLowerCase().includes(searchText.toLowerCase())
		);
		setSearchedResults(searchResult);
	}, [allPosts, searchText]);

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>
					The Community Gallery
				</h1>
				<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
					Take a look at some of the amazingly stunning work of art generated
					using SnapAI and D.A.L.L-E AI
				</p>
			</div>

			<div className='mt-16'>
				<FormField
					labelName='Browse through posts'
					type='text'
					name='text'
					placeholder='Search for something here...'
					value={searchText}
					handleChange={handleSearchChange}
				/>
			</div>

			<div className='mt-10'>
				{loading ? (
					<div className='flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<>
						<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
							Latest community posts
						</p>
						{searchText && (
							<h2 className='font-medium text-[#666e75] text-xl mb-3'>
								Showing Results for{' '}
								<span className='text-[#222328]'>{searchText}</span>:
							</h2>
						)}
						<div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
							{searchText ? (
								<RenderCards
									data={searchedResults}
									title='No Search Results Found'
								/>
							) : (
								<RenderCards data={allPosts} title='No Posts Yet' />
							)}
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Home;
