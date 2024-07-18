const Navbar = () => {
  return (
    <header>
      <div class="logo">Laci</div>
      <div class="search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="user-info">
        <div class="user-name">Edo Mahendra</div>
        <div class="user-university">Universitas Airlangga</div>
      </div>
      <div class="user-image">
        <img src="sakil.png" alt="User Image" />
      </div>
    </header>
  );
};

export default Navbar;
