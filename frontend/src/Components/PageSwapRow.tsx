type props = {
    nums: any[],
    currentNum: number,
    clickedButton: (returnNum: any) => void;
}

const PageSwapRow = ({ nums, currentNum, clickedButton }: props) => {

    const click = (value: any) => {
        clickedButton(value)
    };

    return (
        <>
            {nums.map((num) => (
                num == currentNum
                ? <li className="cursor-pointer rounded-full bg-picton-blue font-mono inline-flex justify-center w-full px-4 py-2 mx-1 text-4xl font-medium text-gray-100" onClick={() => click(num)}><h1>{num}</h1></li>
                : <li className="cursor-pointer rounded-full bg-bice-blue font-mono inline-flex justify-center w-full px-4 py-2 mx-1 text-4xl font-medium text-gray-100" onClick={() => click(num)}><h1>{num}</h1></li>
            ))}
        </>
    )
}

export default PageSwapRow;