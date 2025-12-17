import React from 'react';
import type { ChatMessage } from './ChatWindow';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.role}-message`}>
      <div className="message-content">
        {message.content}
      </div>
      {message.sources && message.sources.length > 0 && (
        <div className="message-sources">
          <h5>Sources:</h5>
          <ul>
            {message.sources.map((source, idx) => (
              <li key={idx}>
                {source.chapter && <span>[{source.chapter}]</span>}
                {source.lesson && <span> {source.lesson}</span>}
                {source.content && <span>: {source.content.substring(0, 100)}...</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Message;