import { useEffect, useState } from "react";
import commentService from "../../services/commentService";
import useNotification from "../../hooks/useNotification";
import type { Comment } from "../../types/comment";
import Notification from "../common/Notification";

interface CommentListProps {
  refreshTrigger?: number;
}

const CommentList: React.FC<CommentListProps> = ({ refreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { notification, showNotification, hideNotification } = useNotification();

  const fetchComments = async () => {
    try {
      const data = await commentService.getMyComments();
      setComments(data);
    } catch (error: any) {
      showNotification("Failed to fetch comments", "error");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger]);

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">You have not posted any comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <p className="text-gray-800">{comment.content}</p>
              <div className="text-sm text-gray-500 mt-2 flex justify-between">
                <span>On blog ID: {comment.blogId}</span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
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
  );
};

export default CommentList;
