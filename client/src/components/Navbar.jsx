const Navbar = () => {
  const auth_token = localStorage.getItem("auth_token");
  return (
    <header className="absolute z-[100] inset-x-0 top-0">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <h4 className="text-2xl font-semibold text-indigo-600">
              Aspire AI
            </h4>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/upload" className="text-sm font-semibold text-gray-900">
            Upload
          </a>
          <a
            href="/career-guidance"
            className="text-sm font-semibold text-gray-900"
          >
            Career Guidance
          </a>
          <a href="/roadmap" className="text-sm font-semibold text-gray-900">
            Roadmap
          </a>
          <a
            href="/mock-inteview"
            className="text-sm font-semibold text-gray-900"
          >
            Mock Interviews
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {auth_token && (
            <a
              href="/profile"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Profile
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
