import React from 'react';
import { useNavigate } from 'react-router-dom';
import { chatApi } from '../../../api/chatApi';
import Button from '../../common/Button/Button';
import toast from 'react-hot-toast';

// Quick chat starter — used from profile pages
const Chat = ({ targetUserId, targetUserName }) => {
  const navigate = useNavigate();

  const handleStartChat = async () => {
    try {
      const res = await chatApi.createOrGet(targetUserId);
      navigate('/messages', {
        state: { conversationId: res.data.conversation._id },
      });
    } catch (error) {
      toast.error('Could not start conversation');
    }
  };

  return (
    <Button variant="outline" onClick={handleStartChat}>
      💬 Message {targetUserName}
    </Button>
  );
};

export default Chat;