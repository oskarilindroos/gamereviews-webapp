import { GameSummary } from "../Types"
type props = {
    game: GameSummary
}

const GamePosterCard = ({ game }: props) => {
    const { name, description, image } = game
    return (
        <div className="bg-bice-blue rounded-md text-white p-4 h-[18rem] w-[11rem] overflow-hidden">
            <div className="h-1/4 flex flex-row justify-between gap-2 mb-2">
                <h1 className="text-left flex w-3/4 font-bold p-2">{name}</h1>
                <img src={image} className="object-fit  p-2" />
            </div>
            <div className="h-3/4">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default GamePosterCard