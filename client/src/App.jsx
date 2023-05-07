import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
	return (
		<BrowserRouter>
			<header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 px-4 border-b border-b-[#e6ebf4]'>
				<Link to='/'>
					<img src={logo} alt='AI.Snap Logo' className='w-28 object-contain' />
				</Link>
				<div className='w-[11%] flex justify-between items-center gap-1'>
					<Link
						to='create-post'
						className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
					>
						Post
					</Link>
					<Link className='font-inter font-medium border bg-[#ffffff] text-black px-4 py-2 rounded-md border-[#e6ebf4] sm:'>
						Sign in
					</Link>
				</div>
			</header>
			<main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
