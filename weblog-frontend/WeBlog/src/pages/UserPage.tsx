import { useState } from "react";
import NavbarUser from "../components/common/NavbarUser";
import DashboardContent from "../components/dashboard/DashboardContent";
import AddBlog from "../components/dashboard/AddBlog";
import BlogList from "../components/dashboard/BlogList";
import CommentList from "../components/dashboard/CommentList";
import UserSidebar from "../components/dashboard/UserSidebar";

const UserPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardContent />;
            case "add-blog":
                return <AddBlog />;
            case "my-blog":
                return <BlogList />;
            case "my-comments":
                return <CommentList />;
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
