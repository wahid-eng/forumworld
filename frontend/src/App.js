import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestRoutes from './utils/routes/GuestRoutes';
import PrivateRoute from './utils/routes/PrivateRoutes';

function App() {
	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />

					<Route path="" element={<GuestRoutes />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>

					<Route path="/" element={<PrivateRoute />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="blog" element={<Blog />} />
					</Route>

					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
