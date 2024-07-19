import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HOME, PETS, PROFILE, SIGN_IN, SIGN_UP } from '@constants/routes';
import { useAuth } from '@hooks/UseAuth';

import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { LoadingIndicator } from './components/common/LoadingIndicator';
import { Navbar } from './components/common/NavBar';
import { Pet } from './components/user/Pet';
import { Profile } from './components/user/Profile';
import { UserPets } from './components/user/UserPets';
interface AuthRouteProps {
	element: React.ElementType;
	[rest: string]: any;
}

function App() {
	const { isAuthenticated, isLoading } = useAuth();

	const AuthRoute = ( { element: Component, ...rest }: AuthRouteProps ) => {
		return isAuthenticated ? <Component {...rest} /> : <Navigate to={SIGN_IN} />;
	};

	if ( isLoading ) { return <LoadingIndicator/>; }

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container d-flex flex-grow-1 col-sm-12 col-md-10 col-lg-8'>
					<Routes>
						<Route path={SIGN_IN} element={<SignIn />} />
						<Route path={SIGN_UP} element={<SignUp />} />
						<Route path={PROFILE} element={<AuthRoute element={Profile}/>} />
						<Route path={PETS} element={<AuthRoute element={UserPets}/>} />
						<Route path={`${PETS}/:id`} element={<AuthRoute element={Pet}/>} />
						<Route path="*" element={<Navigate to={HOME} replace />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
