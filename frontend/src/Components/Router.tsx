import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';

import GameReviewPage from '../Pages/GameReviewPage';

import WriteReviewPage from '../Pages/WriteReviewPage';
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
        { path: '/search', element: <SearchPage /> },
        { path: '/sendreview/:gameId/:reviewId', element: <WriteReviewPage /> },
        { path: '/sendreview/:gameId', element: <WriteReviewPage /> }
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider

