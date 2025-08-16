import Card from "../components/common/Card";
import Footer from "../components/common/Footer";

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl leading-tight mb-6">
                            What We Do
                        </h1>
                        <span className="block text-3xl sm:text-4xl lg:text-5xl text-blue-500 mb-6">
                            Explore Stories Around The World
                        </span>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At <span className="font-semibold text-blue-600">WeBlog</span>, we believe stories connect people. 
                            Our mission is to give everyone a voice to share their journey, ideas, and culture with the world.  
                            <br /><br />
                            We provide a platform for users to share their interests across various fields such as  
                            <span className="font-semibold text-blue-600"> Technology, Health, Sports, Finance, Travel, and Lifestyle</span>.  
                            Whether you are an aspiring writer or a passionate reader, WeBlog is your gateway to a global community of storytellers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-20 px-6 sm:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <Card 
                        word="Unleashing Creativity" 
                        subject="We provide a space where writers, thinkers, and dreamers can freely express themselves. From personal stories to thought-provoking articles, WeBlog empowers every individual to share their unique voice with the world." 
                    />
                    <Card 
                        word="Bridging Cultures" 
                        subject="Our platform connects people from diverse backgrounds, enabling readers to explore new traditions, lifestyles, and perspectives. Every blog becomes a window into a culture, building understanding and empathy across borders." 
                    />
                    <Card 
                        word="Building Connections" 
                        subject="WeBlog is more than just a blogging platform—it’s a community. Writers and readers engage in meaningful conversations, exchange ideas, and form lasting relationships that transcend geography. Together, we make the world smaller and kinder." 
                    />
                    <Card 
                        word="Inspiring Growth" 
                        subject="We encourage continuous learning by giving people a stage to share knowledge and experiences. From self-development to professional skills, WeBlog helps readers and writers grow together in a thriving digital ecosystem." 
                    />
                    <Card 
                        word="Empowering Voices" 
                        subject="Every story matters. We give a platform for unheard voices, allowing underrepresented communities to speak, inspire, and bring awareness to important global and local issues." 
                    />
                    <Card 
                        word="Shaping the Future" 
                        subject="By blending creativity with technology, WeBlog is building a future where ideas flow freely and knowledge is accessible to all. We’re committed to shaping a digital space that inspires change." 
                    />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutPage;
