const UserReviewGridHeader = () => {
    return (
        <div className="grid grid-cols-7 sm:grid-cols-18 gap-2 bg-bice-blue font-bold">
            <div className="col-span-2">
                <h2 className="">Title:</h2>
            </div>

            <div className="justify-self-center">
                <h2>Score:</h2>
            </div>

        </div>
    )
}

export default UserReviewGridHeader