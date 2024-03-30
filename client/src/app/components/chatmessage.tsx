import React from 'react';

interface ChatmessageProps {
    message: string;
    timestamp: string;
    sender: string;
}

export const Chatmessage: React.FC<ChatmessageProps> = ({ message, timestamp, sender }) => {
  const approxCharWidth = 4;
  const maxCharsPerLine = 10 * 5;
  const totalPaddingAndMargins = 2;
  const bubbleWidth = maxCharsPerLine * approxCharWidth + totalPaddingAndMargins;

  const messageBubbleStyles = sender === 'bot' ? {
    backgroundColor: '#C7E1ED',
    color: 'black',
  } : {
    backgroundColor: '#6366F1',
    color: 'white',
  };

  return (
    <div className={`flex flex-col ${sender === 'bot' ? 'items-start' : 'items-end'} gap-2`}>
      <div className={`px-4 py-2.5 rounded-tl-md rounded-bl-md rounded-br-md flex items-center`} style={{ ...messageBubbleStyles, width: bubbleWidth }}>
        <div className="text-sm font-normal font-['Source Sans Pro'] leading-normal break-words">{message}</div>
      </div>
      <div className="flex justify-start items-center">
        <div className="text-xs font-normal font-['Source Sans Pro']" style={{ color: 'white' }}>{timestamp}</div>
      </div>
    </div>
  );
};