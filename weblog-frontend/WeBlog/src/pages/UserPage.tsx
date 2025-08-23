import { useState } from "react";
import NavbarUser from "../components/common/NavbarUser";
import DashboardContent from "../components/dashboard/DashboardContent";
import AddBlog from "../components/dashboard/AddBlog";
import BlogList from "../components/dashboard/BlogList";
import CommentList from "../components/dashboard/CommentList";
import UserSidebar from "../components/dashboard/UserSidebar";

const UserPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    const handleRefreshData = () => {
        setRefreshTrigger((prev) => (prev + 1));
        console.log("DEBUG: Triggering data refresh");
    }

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardContent refreshTrigger={refreshTrigger} />;
            case "add-blog":
                return <AddBlog onBlogCreated={handleRefreshData}/>;
            case "my-blog":
                return <BlogList refreshTrigger={refreshTrigger}/>;
            case "my-comments":
                return <CommentList refreshTrigger={refreshTrigger}/>;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavbarUser />
            <div className="flex flex-1">
                <UserSidebar onChangeTab={setActiveTab} activeTab={activeTab}/>
                <main className="flex-1 p-6 ml-64 bg-blue-50 overflow-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    )
}

export default UserPage;
