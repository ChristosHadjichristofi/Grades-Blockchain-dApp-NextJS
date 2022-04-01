import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark" id="nav-bar-container">
            <Link href="/menu"><a className="navbar-brand">Grades System</a></Link>
            {/* <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" type="button" id="showAll" href="#">Show All</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link 3</a>
                </li>
            </ul> */}
        </nav>
    );
}

export default Navbar;