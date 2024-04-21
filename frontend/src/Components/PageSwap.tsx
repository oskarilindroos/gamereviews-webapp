import PageSwapRow from '../Components/PageSwapRow';

type props = {
    num: number,
    pageSwapFunc: (returnNum: any) => void;
}

const PageSwap = ({ num, pageSwapFunc }: props) => {

    const buttonClicked = (value: any) => {
        pageSwapFunc(value);
    };

    let bar = <PageSwapRow nums={["\u2190", 1, 2, 3, 4, 5, "\u2192"]} currentNum={num} clickedButton={buttonClicked}></PageSwapRow>

    
    switch (num) {
        case 1: {
            bar = <PageSwapRow nums={[0+num, 1+num, 2+num, 3+num, 4+num, "\u2192"]} currentNum={num} clickedButton={buttonClicked}></PageSwapRow>
            break;
        }
        case 2: {
            bar = <PageSwapRow nums={["\u2190", 1, 2, 3, 4, 5, "\u2192"]} currentNum={num} clickedButton={buttonClicked}></PageSwapRow>
            break;
        }
        default: {
            bar = <PageSwapRow nums={["\u2190", -2+num, -1+num, 0+num, 1+num, 2+num, "\u2192"]} currentNum={num} clickedButton={buttonClicked}></PageSwapRow>
        }
    }


    return (
        <ul className="flex flex-row items-baseline mt-8">
            {bar}
        </ul>
    );
};

export default PageSwap;