import React from 'react';
import { NavLink } from 'react-router-dom';
import { CONTACT, HOME, SIGN_IN, SIGN_UP } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';

const leftNavLinks = [
	{ to: HOME, label: 'Home', protected: false, end: true },
	{ to: CONTACT, label: 'Contact', protected: false }
];

const rightNavLinks = [
	{ to: SIGN_IN, label: 'Sign In', protected: false, hideWhenAuth: true },
	{ to: SIGN_UP, label: 'Sign Up', protected: false, hideWhenAuth: true },
	{ to: '/user', label: 'Profile', protected: true,
		children: [
			{ to: '/profile', label: 'Profile', protected: true },
			{ to: '/logout', label: 'Logout', protected: true }
		]
	}
];

export const Navbar: React.FC = () => {
	const { isAuthenticated } = useAuth();

	const renderLink = ( link: any ) => {
		if ( link.protected && !isAuthenticated ) { return null; }
		if ( link.hideWhenAuth && isAuthenticated ) { return null; }
		if ( !link.children ) {
			return (
				<li className="nav-item" key={link.to}>
					<NavLink className="nav-link" to={link.to} end={link.end || false}>{link.label}</NavLink>
				</li>
			);
		}
		if ( link.children ) {
			return (
				<li className="nav-item dropdown" key={link.to}>
					<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						{link.label}
					</a>
					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
						{link.children.map( ( child: any ) =>
							<li key={child.to}>
								<NavLink className="dropdown-item" to={child.to}>{child.label}</NavLink>
							</li>
						)}
					</ul>
				</li>
			);
		}
	};

	return (
		<nav className="bg-white navbar navbar-expand-lg sticky-top">
			<div className="container">
				<NavLink className="navbar-brand" to={HOME}>Pet Walk</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{leftNavLinks.map( link =>
							renderLink( link )
						)}
					</ul>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{rightNavLinks.map( link =>
							renderLink( link )
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
