import { Link } from "react-router";
import SubscriptionEmail from "../components/subscription/SubscriptionEmail";
import Footer from "../components/common/Footer";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-50 pb-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-4-xl mx-auto">
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl leading-tight mb-6">Blog Online Platform</h1>
                        <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-500">Share Your Stories Here</span>
                    </div>
                </div>
                <div className="text-center mt-12 space-y-2">
                    <p className="text-[14px] italic leading-relaxed">
                            We encourage people to share their stories around the world.
                    </p>
                </div>
                <div className="mt-16">
                    <SubscriptionEmail />
                </div>
                <div className="flex items-center justify-center mb-16 mt-20 space-x-5">
                    <Link to='/blog' className="rounded bg-blue-600 text-white p-4 hover:bg-blue-800">
                        Join Our Community
                    </Link>
                    <Link to='/blog' className="rounded bg-blue-600 text-white p-4 hover:bg-blue-800">
                        Explore Stories
                    </Link>
                </div>
            </section>
            <section className="mt-50">
                <Footer/>
            </section>
        </div>
    )
}

export default HomePage;