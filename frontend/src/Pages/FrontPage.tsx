import Laptop from '../Assets/laptop.png'
import Poster from '../Assets/poster_template.png'
import PosterRow from '../Components/PosterRow';
import { GameSummary } from '../Types';

const FrontPage = () => {

    let testGames: GameSummary[] = [{
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    },
    {
        image: "https://newbloodstore.com/cdn/shop/products/NBPosters_DUSK-NoBorder_2021_1024x1024.jpg?v=1644573550",
        name: "Dusk",
        description: "game"
    }
    ];


    return (
        <>
            <div className="mt-40">
                <div className="flex flex-row">
                    <h1 className="font-mono text-gray-100 text-8xl">Discover<br />And Review<br />Games</h1>
                    <img className="h-96 ml-auto" src={Laptop}></img>
                </div>
            </div>
            <div className="mt-40">
                <div className="flex flex-col items-center">
                    <h1 className="font-mono text-gray-100 text-4xl self-center">currently trending</h1>
                    <ul className="flex flex-row items-baseline mt-8">
                        <PosterRow games={testGames} page={"FrontPage"}></PosterRow>
                    </ul>
                    <div className="mb-40"></div>
                </div>
            </div>
        </>
    )
}


export default FrontPage;