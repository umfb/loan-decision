export default function NavBar() {
  return (
    <header className="bg-white">
      <nav className="flex justify-center px-3 lg:px-0">
        <picture>
          <source srcSet="/logo.avif" type="image/avif" />
          <source srcSet="/logo.webp" type="image/webp" />
          <img
            src="/logo.png"
            width="100%"
            height="100%"
            style={{ maxWidth: "450px" }}
            alt="unilagmfb-logo"
          />
        </picture>
      </nav>
    </header>
  );
}
