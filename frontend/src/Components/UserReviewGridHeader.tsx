const UserReviewGridHeader = () => {
    return (
        <div className="grid grid-cols-7 sm:grid-cols-18 gap-2 bg-bice-blue">
            <div className="col-span-2">
                <h2 className="">Title:</h2>
            </div>

            <div className="justify-self-center">
                <p>Score:</p>
            </div>

        </div>
    )
}

export default UserReviewGridHeader