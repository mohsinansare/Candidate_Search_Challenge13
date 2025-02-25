import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentPage = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav className='nav'>
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'active', otherwise we set it to '' or no class
          className={currentPage === '/' ? 'nav-item nav-link active' : 'nav-item nav-link'}
        >
          Home
        </Link>
        <Link
          to="/SavedCandidates"
          // Check to see if the currentPage is `Portfolio`, and if so we use the active class. Otherwise, we set it to have no class
          className={currentPage === '/SavedCandidates' ? 'nav-item nav-link active' : 'nav-item nav-link'}
        >
          Potential Candidates 
        </Link>
      </nav>
    </div>
  )
};

export default Nav;
