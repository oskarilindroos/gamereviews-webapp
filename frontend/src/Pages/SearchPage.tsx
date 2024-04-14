import { useState } from 'react';
import { GameSummary } from "../Types"


import DropdownMenu from '../Components/DropdownMenu';
import SearchBar from '../Components/SearchBar';
import PosterRow from '../Components/PosterRow';
import PageSwap from '../Components/PageSwap';
const SearchPage = () => {

    const [pageNum, setPageNum] = useState<number>(1);

    let testArray: string[] = ['Test1', 'Test2', 'Test3'];

    const testGame: GameSummary = {

        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game",
        id: "1"
    }

    let testGames: GameSummary[] = [
        testGame, testGame, testGame, testGame,
        testGame, testGame, testGame, testGame
    ];

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
                        <PosterRow games={testGames} page={"SearchPage"}></PosterRow>
                    </ul>
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col items-center">
                    <ul className="flex flex-row items-baseline mt-8">
                        <PosterRow games={testGames} page={"SearchPage"}></PosterRow>
                    </ul>
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col items-center">
                    <ul className="flex flex-row items-baseline mt-8">
                        <PosterRow games={testGames} page={"SearchPage"}></PosterRow>
                    </ul>
                    <div className="mb-10"></div>
                    <div>
                        <PageSwap num={pageNum}></PageSwap>
                    </div>
                    <div className="mb-40"></div>
                </div>
            </div>
        </>
    )
}


export default SearchPage;