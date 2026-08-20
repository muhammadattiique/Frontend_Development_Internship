import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm font-medium text-slate-500 mb-6 flex items-center gap-2">
      <Link to="/" className="hover:text-indigo-600 transition-colors">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={routeTo}>
            <span className="text-slate-300">/</span>
            {isLast ? (
              <span className="text-indigo-600 capitalize font-semibold">
                {name}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-indigo-600 capitalize transition-colors"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
