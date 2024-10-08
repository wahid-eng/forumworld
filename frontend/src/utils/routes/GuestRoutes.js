import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function GuestRoutes() {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
