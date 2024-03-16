import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';
import Placeholder from '../Pages/Placeholder';
import GameReviewPage from '../Pages/GameReviewPage';

const router = createBrowserRouter([{
    path: '/',
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <Placeholder /> },
        { path: '/reviews/:gameId', element: <GameReviewPage /> }
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider

