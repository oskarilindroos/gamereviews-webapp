import { useState } from 'react';
import { GameSummary } from "../Types"


import DropdownMenu from '../Components/DropdownMenu';
import SearchBar from '../Components/SearchBar';
import PosterRow from '../Components/PosterRow';
import PageSwap from '../Components/PageSwap';
const SearchPage = () => {

    const [pageNum, setPageNum] = useState<number>(1);

    const swapPage = (value: any) => {
        switch (value) {
            case "\u2190": {
                setPageNum(pageNum-1);
                break;
            }
            case "\u2192": {
                setPageNum(pageNum+1);
                break;
            }
            default: {
                setPageNum(value);
            }
        }
    };

    const handleSearch = (searchTerm: string) => {
        console.log('Searching for:', searchTerm);
        // Perform search logic here
    };

    let testArray: string[] = ['Test1', 'Test2', 'Test3'];

    let testGame: GameSummary = {

        coverUrl: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        summary: "game",
        igdbId: 1
    }

    if(pageNum != 1)
    {
        testGame = {

            image: "https://newbloodstore.com/cdn/shop/products/NBPosters_Ultrakill-NoBorder_2021_1024x1024.png?v=1644575011",
            name: "Ultrakill",
            description: "game",
            id: "1"
        }
    }

    let testGames: GameSummary[] = [
        testGame, testGame, testGame, testGame,
        testGame, testGame, testGame, testGame
    ];

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
                        <PageSwap num={pageNum} pageSwapFunc={swapPage}></PageSwap>
                    </div>
                    <div className="mb-40"></div>
                </div>
            </div>
        </>
    )
}


export default SearchPage;