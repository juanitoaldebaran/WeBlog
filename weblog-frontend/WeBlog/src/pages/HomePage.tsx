import Navbar from "../components/common/Navbar";
import { Link } from "react-router";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            <section className="pt-30 pb-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-4-xl mx-auto">
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl leading-tight mb-6">Blog Online Platform</h1>
                        <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-500">Share Your Stories Here</span>
                    </div>
                    <div className="text-center mt-12 space-y-2">
                        <p className="text-xl leading-relaxed">
                            We encourage people to share their stories around the world.
                        </p>
                        <p className="text-xl leading-relaxed">
                            Join thousand of users to write and reads their stories.
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center justify-center mb-16 mt-10">
                    <Link to='/blog' className="rounded bg-blue-500 text-white p-4">
                        Explore Stories
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage;