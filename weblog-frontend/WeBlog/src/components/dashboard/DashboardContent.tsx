import { faBook, faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "../../services/userService";
import { useState } from "react";



const DashboardContent: React.FC = () => {
    const [stats, setStats] = useState({blog: 0, comments: 0, views: 0});

    const loadData = async () => {
        try {
            const response = await userService.getUserStats();
            
        } catch (error: any) {

        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-center items-center">
                <h1 className="text-bold">Dashboard</h1>
            </div>

            <div className="mt-15 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="rounded p-2 bg-white shadow flex items-center justify-start gap-4">
                    <div className="rounded p-4 bg-blue-50">
                        <FontAwesomeIcon icon={faBook} size={"2x"} color="blue"/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl">10</h1>
                        <p className="text-[22px] font-light text-gray-600">Blog</p>
                    </div>
                </div>
                <div className="rounded p-2 bg-white shadow flex items-center justify-start gap-4">
                    <div className="rounded p-4 bg-blue-50">
                        <FontAwesomeIcon icon={faComment} size={"2x"} color="blue"/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl">10</h1>
                        <p className="text-[22px] font-light text-gray-600">Comment</p>
                    </div>
                </div>
                <div className="rounded p-2 bg-white shadow flex items-center justify-start gap-4">
                    <div className="rounded p-4 bg-blue-50">
                        <FontAwesomeIcon icon={faEye} size={"2x"} color="blue"/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl">10</h1>
                        <p className="text-[22px] font-light text-gray-600">Blog View</p>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default DashboardContent;