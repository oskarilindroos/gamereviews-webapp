import { Link } from "react-router-dom";

import { GameSummary } from "../Types"
import GamePosterCard from "./GamePosterCard";
type props = {
    games: GameSummary[],
    page: string
}

const PosterRow = ({ games, page }: props) => {

    return (
        <>
            {games.map((game) => (
                <li>
                    <Link to={`/reviews/${game.id}`}>
                        <GamePosterCard game={game} page={page} />
                    </Link>
                </li>
            ))}
        </>
    )
}

export default PosterRow;