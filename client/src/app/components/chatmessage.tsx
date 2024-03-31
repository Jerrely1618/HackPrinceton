import React from "react";

interface ChatmessageProps {
  message: string;
  timestamp: string;
  sender: string;
}

export const Chatmessage: React.FC<ChatmessageProps> = ({
  message,
  timestamp,
  sender,
}) => {
  const messageBubbleStyles = {
    display: "inline-block", // Let the bubble size according to its content
    backgroundColor: sender === "bot" ? "#C7E1ED" : "#6366F1",
    color: sender === "bot" ? "black" : "black",
    borderRadius: "20px",
    margin: "0 0 10px",
    marginBottom: "10px",

    fontFamily: "Kufam, sans-serif",
  };

  return (
    <div
      className={`flex flex-col ${
        sender === "bot" ? "items-start mb-7" : "items-end mb-7"
      } gap-2`}
    >
      {sender === "bot" && (
        <div className="flex items-start gap-2">
          <div className="w-[35px] h-[35px] bg-black rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="16"
              viewBox="0 0 16 22"
              fill="none"
            >
              <path
                d="M9.42116 22C8.10113 22 6.86627 21.762 5.71657 21.2861C4.56687 20.8102 3.5662 20.1072 2.71457 19.177C1.88423 18.2468 1.22422 17.1003 0.734531 15.7375C0.244844 14.3746 0 12.8171 0 11.0649C0 9.33432 0.244844 7.78761 0.734531 6.42478C1.24551 5.04031 1.92681 3.87217 2.77844 2.92035C3.65136 1.96853 4.66267 1.24385 5.81238 0.746313C6.98337 0.248771 8.22888 0 9.5489 0C10.8689 0 12.0399 0.270403 13.0619 0.811209C14.0838 1.35201 14.9248 1.97935 15.5848 2.69322L13.6048 5.12684C13.0512 4.5644 12.4551 4.12094 11.8164 3.79646C11.1776 3.45034 10.4538 3.27729 9.64471 3.27729C8.79308 3.27729 8.00532 3.46116 7.28144 3.82891C6.57884 4.17502 5.96141 4.68338 5.42914 5.35398C4.91816 6.00295 4.51364 6.80334 4.21557 7.75516C3.93879 8.70698 3.8004 9.77778 3.8004 10.9676C3.8004 13.3904 4.31138 15.294 5.33333 16.6785C6.37658 18.0413 7.78177 18.7227 9.5489 18.7227C10.4857 18.7227 11.316 18.528 12.0399 18.1386C12.7638 17.7276 13.4238 17.1976 14.02 16.5487L16 18.9174C15.1484 19.9125 14.169 20.6804 13.0619 21.2212C11.976 21.7404 10.7625 22 9.42116 22Z"
                fill="#4629F2"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className="text-white text-base font-semibold font-['Source Sans Pro']"
              style={{
                fontFamily: "Kufam, sans-serif",
              }}
            >
              Charlie
            </div>
            <div
              className={`p-2 rounded-tl-md rounded-bl-md rounded-br-md`}
              style={{ ...messageBubbleStyles }}
            >
              <div className=" leading-normal text-[12px]">{message}</div>
            </div>
            <div
              className="text-xs"
              style={{ color: "white", fontFamily: "Kufam, sans-serif" }}
            >
              {timestamp}
            </div>
          </div>
        </div>
      )}
      {sender !== "bot" && (
        <div className="flex flex-col items-end">
          <div
            className={`px-4 py-2.5 rounded-tl-md rounded-bl-md rounded-br-md flex items-center `}
            style={{ ...messageBubbleStyles }}
          >
            <div className="leading-normal text-[12px]">{message}</div>
          </div>
          <div className="flex justify-end items-center">
            <div
              className="text-xs font-normal font-['Source Sans Pro'] mt-2"
              style={{ color: "white", fontFamily: "Kufam, sans-serif" }}
            >
              {timestamp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
