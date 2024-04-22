import { useState, useCallback, useEffect } from 'react';

import Laptop from '../Assets/laptop.png'
import Poster from '../Assets/poster_template.png'
import PosterRow from '../Components/PosterRow';
import { GameSummarySimple } from '../Types';

const FrontPage = () => {

    const [games, setGames] = useState<GameSummarySimple[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchGames = useCallback(async () => {
        try {
            setError(null)
            setIsLoading(true);

            const response = await fetch(`http://localhost:5050/api/games/?order_by=hypes&number_of_games=8&order=desc`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setGames(data);
        } catch (error: any) {
            setError(error.message);
            console.error('Error: ', error);
        }
        setIsLoading(false);

    }, []);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    //display content based on the outcome of fetchGames
    let content = <h1 className="font-mono text-gray-100 text-6xl">No games found</h1>;

    if (error) {
        content = <h1 className="font-mono text-gray-100 text-6xl">{error}</h1>;
    }

    if (isLoading) {
        content = <h1 className="font-mono text-gray-100 text-6xl">Fetching games...</h1>;
    }

    if (games.length > 0) {
        content = <>
            <div className="flex flex-col items-center">
                <h1 className="font-mono text-gray-100 text-4xl self-center">currently trending</h1>
                <ul className="flex flex-row items-baseline mt-8">
                    <PosterRow games={games} page={"FrontPage"}></PosterRow>
                </ul>
                <div className="mb-40"></div>
            </div>
        </>
    }


    return (
        <>
            <div className="mt-40">
                <div className="flex flex-row">
                    <h1 className="font-mono text-gray-100 text-8xl">Discover<br />And Review<br />Games</h1>
                    <img className="w-4/12 ml-auto" src={Laptop}></img>
                </div>
            </div>
            <div className="mt-40">
                {content}
            </div>
        </>
    )
}


export default FrontPage;