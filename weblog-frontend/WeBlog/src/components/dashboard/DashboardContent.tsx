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

const DashboardContent: React.FC<DashboardContentProps> = ({ refreshTrigger }) => {
  const [userProfile, setUserProfile] = useState<UserResponse | null>(null);
  const [statsData, setStatsData] = useState<UserStats | null>({
    totalBlog: 0,
    totalComment: 0,
    totalView: 0,
  });

  const { notification, showNotification, hideNotification } = useNotification();
  const { isLoading } = useAuth();

  const getUserData = async () => {
    try {
      const userResponse = await userService.getCurrentUserProfile();
      setUserProfile(userResponse);
    } catch (error: any) {
      showNotification("Failed to get current user profile", "error");
    }
  };

  const getUserStats = async () => {
    try {
      const userStats = await userService.getUserStats();
      setStatsData(userStats);
    } catch (error: any) {
      showNotification("Failed to load user stats", "error");
    }
  };

  useEffect(() => {
    getUserData();
    getUserStats();
  }, [refreshTrigger]);

  const statsCards = [
    {
      title: "Blogs",
      value: statsData?.totalBlog || 0,
      icon: faBook,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Comments",
      value: statsData?.totalComment || 0,
      icon: faComment,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Views",
      value: statsData?.totalView || 0,
      icon: faEye,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-10 mt-20">
      {/* Header */}
      <div className="flex items-center gap-2">
        <p className="text-3xl font-semibold text-gray-800">
          Welcome back,
        </p>
        <p className="text-gray-600 text-3xl">{userProfile?.email} !</p>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="text-center text-gray-500 italic">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cursor-pointer">
          {statsCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-6 bg-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-6"
            >
              <div
                className={`rounded-xl p-5 flex items-center justify-center text-2xl ${card.color}`}
              >
                <FontAwesomeIcon icon={card.icon} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{card.value}</h1>
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        position="top-center"
        duration={4000}
      />
    </div>
  );
};

export default DashboardContent;
