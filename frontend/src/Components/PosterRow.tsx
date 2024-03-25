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
                    <GamePosterCard game={game} page={page}></GamePosterCard>
                </li>
            ))}
        </>
    )
}

export default PosterRow;