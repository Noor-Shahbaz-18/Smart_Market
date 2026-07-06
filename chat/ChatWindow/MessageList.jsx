import React from 'react';
import MessageBubble from './MessageBubble';
import Spinner from '../../common/Loader/Spinner';

const MessageList = ({ messages, loading, currentUserId }) => {
  if (loading) return <Spinner />;

  if (messages.length === 0) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gray)',
        fontSize: '0.9rem',
      }}>
        <p>No messages yet. Say hello! 👋</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isOwn={msg.sender?._id === currentUserId || msg.sender === currentUserId}
        />
      ))}
    </>
  );
};

export default MessageList;