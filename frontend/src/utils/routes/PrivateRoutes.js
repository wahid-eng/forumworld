import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute() {
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
