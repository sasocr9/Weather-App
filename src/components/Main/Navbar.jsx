function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <p className="logo">React Weather</p>

      {children}
    </nav>
  );
}

export default Navbar;
