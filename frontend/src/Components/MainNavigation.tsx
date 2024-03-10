import { Link } from 'react-router-dom';

//The navigation happens here
const MainNavigation = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <h1>test1</h1>
                        <Link to="/">
                        </Link>
                    </li>
                    <li>
                    <h1>test2</h1>
                        <Link to="/">
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default MainNavigation;