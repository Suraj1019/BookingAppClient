import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UserContext } from "../App";
import StayNestLogo from "../Assets/Logo";
import ProfileIcon from "../Assets/ProfileIcon";
import SearchIcon from "../Assets/SearchIcon";

const DEBOUNCE_MS = 1000;

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [searchText, setSearchText] = useState(q);

  const goToSearch = (term, replace = false) => {
    navigate(term ? `/?q=${encodeURIComponent(term)}` : "/", { replace });
  };

  // Enter key / icon click: search immediately
  const handleSearch = () => goToSearch(searchText.trim());

  // keep the input in sync with the URL (logo click, back button, leaving the page)
  useEffect(() => {
    setSearchText((prev) => (prev.trim() === q ? prev : q));
  }, [q, pathname]);

  // debounced search while typing
  useEffect(() => {
    if (!isHome) return;

    const term = searchText.trim();
    if (term === q) return; // URL already matches, nothing to do

    const timer = setTimeout(() => {
      goToSearch(term, true); // replace: don't flood browser history
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer); // runs on every keystroke, resetting the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, q, isHome]);

  return (
    <header className="flex justify-between items-center w-full">
      <Link
        to="/"
        className="flex items-center gap-1 text-primary cursor-pointer"
      >
        <StayNestLogo />
      </Link>

      {isHome && (
        <div className="relative flex-1 max-w-md mx-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Location/Name"
            className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
          >
            <SearchIcon />
          </button>
        </div>
      )}

      <div
        className={`flex items-center justify-center border border-gray-500 rounded-full px-2 cursor-pointer h-10 ${
          user ? "gap-2" : "gap-0"
        }`}
        onClick={() => navigate(user ? "/account" : "/login")}
      >
        <div className="flex items-center p-1 bg-gray-500 rounded-full text-white">
          <ProfileIcon />
        </div>
        <span className="font-semibold capitalize">
          {user && user?.name?.split(" ")[0]}
        </span>
      </div>
    </header>
  );
};

export default Header;
