import { Link } from "react-router-dom";

import { GameSummarySimple } from "../Types"
import GamePosterCard from "./GamePosterCard";
type props = {
    games: GameSummarySimple[],
    page: string
}

const PosterRow = ({ games, page }: props) => {

    return (
        <>
            {games.map((game, index) => (
                <li>
                    <Link to={`/reviews/${game.igdbId}`}>
                        <GamePosterCard key={index} game={game} page={page} />
                    </Link>
                </li>
            ))}
        </>
    )
}

export default PosterRow;