import DropdownMenu from '../Components/DropdownMenu';
import Poster from '../Assets/poster_template.png'
import SearchBar from '../Components/SearchBar';
import GamePosterCard from '../Components/GamePosterCard';
import { GameSummary } from "../Types"

const SearchPage = () => {

    let testArray: string[] = ['Test1', 'Test2', 'Test3'];

    let testGame: GameSummary = {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    }

    const handleSearch = (searchTerm: string) => {
        console.log('Searching for:', searchTerm);
        // Perform search logic here
    };

    return (
        <>
            <div className="mt-40">
                <div className="flex flex-row">

                    <div className="pr-14">
                        <DropdownMenu name={"order"} content={testArray}></DropdownMenu>
                        <DropdownMenu name={"tags"} content={testArray}></DropdownMenu>
                        <DropdownMenu name={"year"} content={testArray}></DropdownMenu>
                        <DropdownMenu name={"rating"} content={testArray}></DropdownMenu>
                    </div>

                    <div className="flex flex-row ml-auto">
                        <SearchBar onSearch={handleSearch} />
                    </div>



                </div>
            </div>
            <div className="mt-4">
                <div className="flex flex-col items-center">
                    <ul className="flex flex-row items-baseline mt-8">
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                        <li>
                            <GamePosterCard game={testGame} page={"SearchPage"}></GamePosterCard>
                        </li>
                    </ul>
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col items-center">
                    <ul className="flex flex-row items-baseline mt-8">
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                    </ul>
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col items-center">
                    <ul className="flex flex-row items-baseline mt-8">
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-80 mx-4" src={Poster}></img>
                        </li>
                    </ul>
                    <div className="mb-40"></div>
                </div>
            </div>
        </>
    )
}


export default SearchPage;