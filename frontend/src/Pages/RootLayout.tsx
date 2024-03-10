import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";

const RootLayout = () => {
    return (
        <div className="bg-cover min-h-screen bg-sky-800"> 
            <div className="w-4/5 mx-auto pt-6">
                <MainNavigation />
                <Outlet></Outlet>
            </div>
        </div>
    )
}


export default RootLayout;