import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import pic from '../../assets/avatar.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user && (
        <div>
          <div className='nav-bar-right'>
              <img className="avatar" src={pic} alt='netflix avatar' />
              <i onMouseOver={openMenu} className="fa-solid fa-caret-down"></i>
          </div>

        <ul onMouseOver={openMenu} onMouseOut={closeMenu} className={ulClassName} ref={ulRef}>
              <li >{user.username}</li>
              <li>
                <button className='logout-btn' onClick={handleLogout}>Log Out</button>
              </li>
        </ul>
        </div>
      )}

    </>
  );
}

export default ProfileButton;
