import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearch] = useState('')
	const [showBar, setBar] = useState(false)

	return (
		<div className="nav-bar-container">
			<ul className='nav-bar-content'>
				<li className='nav-bar-left'>
					<NavLink style={{textDecoration: 'none'}} exact to="/"><span className="title">TONYFLIX</span></NavLink>
					<NavLink style={{textDecoration: 'none'}} to='/mywatchlists'><span className='watchlist-span'>Watchlist</span></NavLink>
				</li>
				{isLoaded && (
					<li style={{display: 'flex', alignItems: 'center'}}>
						{showBar ? (
							<input className='search-input' value={searchInput} onChange={e => setSearch(e.target.value)}></input>
						):
						<i onClick={() => setBar(true)} className="fa-solid fa-magnifying-glass"></i>
						}

						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
