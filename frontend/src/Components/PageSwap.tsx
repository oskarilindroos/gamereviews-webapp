type props = {
    num: number
}

const PageSwap = ({ num }: props) => {

    const temp = () => {
        console.log("clicked")
    };

    let bar = <img className="w-11/12 mx-4"></img>

    /*
    switch (num) {
        case 1: {
            bar = <img className="w-11/12 mx-4"></img>
            break;
        }
        case 2: {
            bar = <img className="w-11/12 mx-4"></img>
            break;
        }
        default: {
            bar = <img className="w-11/12 mx-4"></img>
        }
    }*/


    return (
        <ul className="flex flex-row items-baseline mt-8">
            <li className="rounded-full bg-bice-blue font-mono inline-flex justify-center w-full px-4 py-2 text-4xl font-medium text-gray-100">
                <h1>&larr;</h1>
            </li>
            <li className="rounded-full bg-bice-blue font-mono inline-flex justify-center w-full px-4 py-2 text-4xl font-medium text-gray-100">
                <h1>&rarr;</h1>
            </li>
        </ul>
    );
};

export default PageSwap;