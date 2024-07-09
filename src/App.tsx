import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HOME, PROFILE, SIGN_IN, SIGN_UP } from '@constants/routes';
import { useAuth } from '@hooks/UseAuth';

import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Navbar } from './components/common/NavBar';
import { Profile } from './components/user/Profile';

import './assets/styles/app.scss';

interface AuthRouteProps {
	element: React.ElementType;
	[rest: string]: any;
}

function App() {
	const { isAuthenticated } = useAuth();

	const AuthRoute = ( { element: Component, ...rest }: AuthRouteProps ) => {
		return isAuthenticated ? <Component {...rest} /> : <Navigate to={SIGN_IN} />;
	};

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path={SIGN_IN} element={<SignIn />} />
					<Route path={SIGN_UP} element={<SignUp />} />
					<Route path={PROFILE} element={<AuthRoute element={Profile} />} />
					<Route path="*" element={<Navigate to={HOME} replace />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
