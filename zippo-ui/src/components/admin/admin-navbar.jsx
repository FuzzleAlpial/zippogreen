export default function AdminNavBar(){
  const handleAdminLogOut = () => {
    localStorage.clear();
    window.location.href="./login";
  }

  return(
      <nav className="menu-bar">
      <div id="logo">
        <img src="../images/zippo-logo-white.png" alt="Zippo Logo" />
      </div>
      <div className="nav-bar">
          <ul className="nav-list">
              <li><a href="./product-control" className="nav-button">Product control</a></li>
              <li><a href="./order-control" className="nav-button">Order control</a></li>
              <button className="header-button" onClick={handleAdminLogOut}>Log out</button>
          </ul>
      </div>
    </nav>
  )
}