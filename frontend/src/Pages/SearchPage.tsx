import { useState, useCallback, useEffect } from 'react';
import { GameSummarySimple } from "../Types"


import DropdownMenu from '../Components/DropdownMenu';
import SearchBar from '../Components/SearchBar';
import PosterRow from '../Components/PosterRow';
import PageSwap from '../Components/PageSwap';
const SearchPage = () => {

    const [pageNum, setPageNum] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [orderBy, setOrderBy] = useState<string>('name');
    const [games, setGames] = useState<GameSummarySimple[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const swapPage = (value: any) => {

        //I have to do this, because otherwise fetchGames updates on a delay of one number
        let num: number = 0;

        switch (value) {
            case "\u2190": {
                num = pageNum - 1;
                setPageNum(pageNum - 1);
                break;
            }
            case "\u2192": {
                num = pageNum + 1;
                setPageNum(pageNum + 1);
                break;
            }
            default: {
                num = value;
                setPageNum(value);
            }
        }

        fetchGames(num, search, orderBy);
    };

    const fetchGames = useCallback(async (numPage: number, searchTerm: string, ordering: string) => {

        let apiAddress: string = `http://localhost:5050/api/games/?number_of_games=24&page_number=` + numPage;

        if (searchTerm) {
            apiAddress = `http://localhost:5050/api/games/search?number_of_games=24&search_content=` + searchTerm + `&page_number=` + numPage;
        }

        if (orderBy) {
            apiAddress = apiAddress + `&order_by=` + ordering + `&order=desc`
        }


        try {
            setError(null)
            setIsLoading(true);

            const response = await fetch(apiAddress);
            if (!response.ok) {
                throw new Error('Something went wrong! The search term probably brings up nothing :/');
            }

            const data = await response.json();
            setGames(data);
        } catch (error: any) {
            setError(error.message);
            alert(error.message);
            console.error('Error: ', error);
        }
        setIsLoading(false);

    }, []);

    useEffect(() => {
        fetchGames(1, '', orderBy);
    }, [fetchGames]);

    const temp = (value: string) => {
        console.log("clicked" + value);
    };

    let orderByValues: string[] = ['name', 'hype', 'id', 'release date'];

    const orderByFunc = (ordering: string) => {
        if (ordering == 'release date') {
            ordering = 'releaseDate'
        }

        setOrderBy(ordering);
        setPageNum(1);
        fetchGames(1, search, ordering);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm);
        setPageNum(1);
        fetchGames(1, searchTerm, orderBy);
    };

    let testArray: string[] = ['placeholder1', 'placeholder2', 'placeholder3'];


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
                <ul className="flex flex-row items-baseline mt-8 h-1/6">
                    <PosterRow games={games.slice(0, 8)} page={"SearchPage"}></PosterRow>
                </ul>
                <div className="mb-2"></div>
            </div>
            <div className="flex flex-col items-center">
                <ul className="flex flex-row items-baseline mt-8">
                    <PosterRow games={games.slice(8, 16)} page={"SearchPage"}></PosterRow>
                </ul>
                <div className="mb-2"></div>
            </div>
            <div className="flex flex-col items-center">
                <ul className="flex flex-row items-baseline mt-8 h-1/6">
                    <PosterRow games={games.slice(16)} page={"SearchPage"}></PosterRow>
                </ul>
                <div className="mb-10"></div>
            </div>
        </>
    }

    return (
        <>
            <div className="mt-40">
                <div className="flex flex-row">

                    <div className="pr-14">
                        <DropdownMenu name={"order"} content={orderByValues} searchVarFunc={orderByFunc}></DropdownMenu>
                        <DropdownMenu name={"tags"} content={testArray} searchVarFunc={temp}></DropdownMenu>
                        <DropdownMenu name={"year"} content={testArray} searchVarFunc={temp}></DropdownMenu>
                        <DropdownMenu name={"rating"} content={testArray} searchVarFunc={temp}></DropdownMenu>
                    </div>

                    <div className="flex flex-row ml-auto">
                        <SearchBar onSearch={handleSearch} />
                    </div>



                </div>
            </div>
            <div className="mt-4">
                {content}
                <div className="flex flex-col items-center">
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