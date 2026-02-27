import { Link } from "react-router";
import Background from "../components/Background";

export default function NotFound() {
    return (
        <Background>
            <Link className="absolute top-4 right-4" to="/dashboard">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </Link> 
            <div className="flex flex-col justify-center items-center min-h-screen w-full">
                <h1 className="font-bold mb-8 text-7xl text-[#212B27] dark:text-[#212B27]  ">404</h1>
                <p className="font-semibold">The page you are looking for is not found.</p>
            </div>
        </Background>
    );
}