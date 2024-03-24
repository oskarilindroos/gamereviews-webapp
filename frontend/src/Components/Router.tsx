import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';

import GameReviewPage from '../Pages/GameReviewPage';

import RootLayout from '../Pages/RootLayout';
import FrontPage from '../Pages/FrontPage';
import SearchPage from '../Pages/SearchPage';


const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
        { path: '/reviews/:gameId', element: <GameReviewPage /> },
        { index: true, element: <FrontPage /> },
        { path: '/search', element: <SearchPage /> }
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider

