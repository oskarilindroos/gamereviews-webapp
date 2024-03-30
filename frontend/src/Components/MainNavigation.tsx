import { Link } from 'react-router-dom';

const MainNavigation = () => {
    return (
        <header>
            <nav>
                <ul className="flex flex-row items-baseline">
                    <div className="flex items-">
                        <li>
                            <Link to="/">
                                <h1 className="font-mono text-gray-100 text-6xl">GamesReview</h1>
                            </Link>
                        </li>
                    </div>
                    <div className="flex flex-row ml-auto">
                        <li>
                            <Link to="/search">
                                <h1 className="font-mono text-gray-100 text-4xl ml-10">games</h1>
                            </Link>
                        </li>

                        <li>
                            {/* TODO: Replace :userId with actual userId */}

                            {/* TODO: Make visible to logged in users only */}
                            <Link to="/user/:userId/reviews">
                                <h1 className="font-mono text-gray-100 text-4xl ml-10">my reviews</h1>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <h1 className="font-mono text-gray-100 text-4xl ml-10">sign in</h1>
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}


export default MainNavigation;