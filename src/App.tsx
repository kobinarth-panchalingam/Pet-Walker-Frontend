import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Navbar } from './components/common/NavBar';

import './assets/styles/app.scss';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/signin' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
