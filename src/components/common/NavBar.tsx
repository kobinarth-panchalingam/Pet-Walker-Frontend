import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, HOME, SIGN_IN, SIGN_UP } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';

export const Navbar: React.FC = () => {
	const { isAuthenticated, logout, user } = useAuth();
	const linksContainerRef = useRef<HTMLDivElement | null>( null );

	const handleNavCollapse = () => {
		linksContainerRef.current?.classList.remove( 'show' );
	};

	const handleLogout = () => {
		logout();
	};

	const renderLink = ( link: any, index: number ) => {
		if ( link.children ) {
			return (
				<li className="nav-item dropdown" key={index}>
					<Link
						className="nav-link dropdown-toggle"
						to={link.to}
						data-bs-toggle="dropdown"
						aria-expanded="false">
						{link.text}
					</Link>
					<ul className="dropdown-menu">
						{link.children.map( ( child: any, index: number ) =>
							<li
								onClick={handleNavCollapse}
								key={index}>
								{child.action ?
									<button className="dropdown-item" onClick={child.action}>{child.text}</button>
									:
									<Link className="dropdown-item" to={child.to}> {child.text}</Link>
								}
							</li>
						)}
					</ul>
				</li>
			);
		} else {
			return (
				<li
					onClick={handleNavCollapse}
					className="nav-item" key={index}>
					<Link className="nav-link" to={link.to} > {link.text} </Link>
				</li>
			);
		}
	};

	const renderLinks = ( links: any[] ) => {
		return links.map( ( link: any, index: number ) => {
			if ( link.protected && !isAuthenticated ) { return null; }
			if ( link.hideWhenAuth && isAuthenticated ) { return null; }
			return renderLink( link, index );
		}
		);
	};

	const leftNavLinks = [
		{ to: HOME, text: 'Home', protected: false },
		{ to: CONTACT, text: 'Contact', protected: false }
	];

	const rightNavLinks = [
		{ to: SIGN_IN, text: 'Sign In', protected: false, hideWhenAuth: true },
		{ to: SIGN_UP, text: 'Sign Up', protected: false, hideWhenAuth: true },
		{
			to: '',
			text: user?.firstName || 'User',
			children: [
				{ to: 'PROFILE', text: 'Profile' },
				{ to: '', text: 'Logout', action: handleLogout }
			],
			protected: true
		}
	];

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container">
				<Link className="navbar-brand" to={HOME}>PetWalk</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbar-content"
					aria-controls="navbar-content"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					id="navbar-content"
					ref={linksContainerRef}
					className="collapse navbar-collapse text-start">
					<ul className="navbar-nav mr-auto">
						{renderLinks( leftNavLinks )}
					</ul>
					<ul className="navbar-nav ms-auto">
						{renderLinks( rightNavLinks )}
					</ul>
				</div>
			</div>
		</nav>
	);
};
