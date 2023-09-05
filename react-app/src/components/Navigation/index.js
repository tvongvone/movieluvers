import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieResults } from '../../store/movies';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearch] = useState('')
	const [showBar, setBar] = useState(false)
	const dispatch = useDispatch();
	const history = useHistory();

	const menu = useRef()

	const closeOpenMenus = (e) => {
        if (menu.current && showBar && !menu.current.contains(e.target)) {
          setBar(false);
        }
    };

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(getMovieResults({movieInput: searchInput}))
		history.push('/movies/results')
	}

	document.addEventListener("mousedown", closeOpenMenus)

	return (
		<div className="nav-bar-container">
			<ul className='nav-bar-content'>
				<li className='nav-bar-left'>
					<NavLink style={{textDecoration: 'none'}} exact to="/"><span className="title">TONYFLIX</span></NavLink>
					<NavLink style={{textDecoration: 'none'}} to='/mywatchlists'><span className='watchlist-span'>Watchlist</span></NavLink>
				</li>
				{isLoaded && (
					<li ref={menu} style={{display: 'flex', alignItems: 'center'}}>
						{sessionUser && (
							<>
							{showBar ? (
								<form onSubmit={submitHandler} >
									<input style={{color: 'white', backgroundColor: 'black', border: 'solid white 1px', borderRadius: '10px', padding: '5px'}} className='search-input' value={searchInput} onChange={e => setSearch(e.target.value)} placeholder='Search by title'></input>
								</form>
							):
							<i onClick={() => setBar(true)} className="fa-solid fa-magnifying-glass"></i>
							}
							</>
						)}

						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
