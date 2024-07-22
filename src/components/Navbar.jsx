import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <header className="header">
            <div className="logo-sidebar">
                <img src="src/assets/burger.svg" />
                <div className="logo">Laci</div>
            </div>
            <div className="search-container">
                <img src="src/assets/search-in.svg" />
                <input type="text" placeholder="Search" />
            </div>
            <div className="user-section">
                <div className="user-info">
                    <div className="user-name">Edo Mahendra</div>
                    <div className="user-university">Universitas Airlangga</div>
                </div>
                <div className="search-icon">
                    <img src="src/assets/search.svg" />
                </div>
                <div className="add-post-article">
                    <img src="src/assets/add.svg" />
                </div>
                <div className="user-image">
                    <img src="src/assets/sakil.png" alt="User Image" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;