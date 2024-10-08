import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function GuestRoutes() {
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
