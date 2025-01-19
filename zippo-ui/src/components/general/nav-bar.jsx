import { useState } from "react";

const LogOutModal = ({isOpen, onClose}) => {
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "./login"
  }

  if (!isOpen) {
    return null
  }

  return (
    <div id="logout-modal-overlay" onClick={onClose}>
      <div id="logout-modal">
          <button onClick={handleLogOut} id="logout-button">Log out</button>
      </div>
    </div>
);    
}

export default function NavBar(){
  const userID = localStorage.getItem("isLoggedIn");
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };    

  const handleClickCart = () => {
    if (userID){
      window.location.href = "./cart"
    }
    else{
      window.location.href = "./login"
    }
  }

  const handleLogIn = () => {
    window.location.href = "./login"
  }

      

  const handleClickAvatar = () => {
    setModalOpen(true);
  }

  
  return(
      <nav className="menu-bar">
      <div id="logo">
        <a href="./">
          <img src="../images/zippo-logo-white.png" alt="Zippo Logo" />
        </a>
      </div>
      <div className="nav-bar">
        <ul className="nav-list">
          <li><a href="./" className="nav-button">Home</a></li>
          <li><a href="./bestseller" className="nav-button">Bestsellers</a></li>
          <li className="dropdown">
            <a className="nav-button">Categories</a>
            <div className="dropdown-content">
              <a href="./classics">Zippo Classics</a>
              <a href="./premium">Zippo Premium</a>
              <a href="./asia">Asia Collection</a>
              <a href="./slim">Zippo Slim</a>
            </div>
          </li>
          { userID && 
            <div>
              <button className="header-button" onClick={handleClickCart}>
                <img src="../images/cart.png" alt="Cart" />
                <span>My cart</span>
              </button>
            </div>            
          }
          <div id="log-in-and-out">
            { userID ? 
              <button onClick={handleClickAvatar} id="avatar-button"><img src="../images/user-avatar.png" alt="User avatar" id="avatar" /></button> :
              <button onClick={handleLogIn} className="header-button">Log in</button>
            }
          </div>
        </ul>
      </div>
      <LogOutModal isOpen={isModalOpen} onClose={closeModal}/>
    </nav>
  )
}