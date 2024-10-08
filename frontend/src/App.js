import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import NoPage from './pages/NoPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="blogs" element={<Blogs />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
