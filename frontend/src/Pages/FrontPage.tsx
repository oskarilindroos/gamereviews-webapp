import Laptop from '../Assets/laptop.png'

const FrontPage = () => {
    return (
        <div className="mt-40">
            <div className="flex flex-row">
                <h1 className="font-mono text-gray-100 text-8xl">Discover<br />And Review<br />Games</h1>
                <img className="h-96 ml-auto" src={Laptop}></img>
            </div>
        </div>
    )
}


export default FrontPage;