import Laptop from '../Assets/laptop.png'
import Poster from '../Assets/poster_template.png'

const FrontPage = () => {
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
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                        <li>
                            <img className="h-64 mx-4" src={Poster}></img>
                        </li>
                    </ul>
                    <div className="mb-40"></div>
                </div>
            </div>
        </>
    )
}


export default FrontPage;