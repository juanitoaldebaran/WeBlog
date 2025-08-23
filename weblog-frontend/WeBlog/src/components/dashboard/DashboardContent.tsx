import { faBook, faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "../../services/userService";
import { useEffect, useState } from "react";
import useNotification from "../../hooks/useNotification";
import type { UserResponse, UserStats } from "../../types/user";
import Notification from "../common/Notification";
import useAuth from "../../hooks/useAuth";

interface DashboardContentProps {
    refreshTrigger?: number;
}

const DashboardContent: React.FC<DashboardContentProps> = ({refreshTrigger}) => {
    const [userProfile, setUserProfile] = useState<UserResponse | null>(null);
    const [statsData, setStatsData] = useState<UserStats | null>({
        totalBlog: 0,
        totalComment: 0,
        totalView: 0,
    });
    const {notification, showNotification, hideNotification} = useNotification();
    const {isLoading} = useAuth();
    
    const getUserData = async () => {
        try {
            const userResponse = await userService.getCurrentUserProfile();
            setUserProfile(userResponse);
        } catch (error: any) {
            showNotification("Failed to get current user profile");
        }
    }

    const getUserStats = async () => {
        try {
            const userStats = await userService.getUserStats();
            setStatsData(userStats);
        } catch (error: any) {
            showNotification("Failed to load user stats", "error");
        }
    }

    useEffect(() => {
        getUserData();
        getUserStats();
    }, [refreshTrigger]);

    return (
        <div className="space-y-8">
            <div className="flex justify-center items-center">
                <h1 className="text-bold text-2xl text-gray-800">{userProfile?.email}</h1>
            </div>

            {isLoading ? (
                <div className="text-center">Loading stats....</div>
            ) 
            : 
            (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="rounded-xl p-4 bg-white shadow flex items-center gap-6 hover:shadow-lg transition">
                        <div className="rounded p-4 bg-blue-50 flex items-center justify-center">
                            <FontAwesomeIcon icon={faBook} size={"2x"} className="text-gray-600"/>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl">{statsData?.totalBlog || 0}</h1>
                            <p className="text-[22px] font-light text-gray-600">Blog</p>
                        </div>
                    </div>
                    <div className="rounded-xl p-4 bg-white shadow flex items-center gap-6 hover:shadow-lg transition">
                        <div className="rounded p-4 bg-blue-50 flex items-center justify-center">
                            <FontAwesomeIcon icon={faComment} size={"2x"} className="text-blue-600"/>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl">{statsData?.totalComment || 0}</h1>
                            <p className="text-[22px] font-light text-gray-600">Comment</p>
                        </div>
                    </div>
                    <div className="rounded-xl p-4 bg-white shadow flex items-center gap-6 hover:shadow-lg transition">
                        <div className="rounded p-4 bg-blue-50 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEye} size={"2x"} className="text-green-600"/>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl">{statsData?.totalView || 0}</h1>
                            <p className="text-[22px] font-light text-gray-600">View</p>
                        </div>
                    </div>
                </div>
            )}
        
        <Notification 
                    message={notification.message}
                    type={notification.type}
                    isVisible={notification.isVisible}
                    onClose={hideNotification}
                    position="top-center"
                    duration={4000}
                />
        </div>
    )
}

export default DashboardContent;