import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {!isChatOpen && (
        <button
          className="floating-chat-button"
          onClick={toggleChat}
          aria-label="Open chat"
        >
          <img
            src="/img/RAG.jpg"
            alt="RAG Chat"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          />
        </button>
      )}

      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default FloatingChatButton;