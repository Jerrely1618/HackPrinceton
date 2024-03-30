import React from 'react';

export default function Chat() {
    return (
        <div style={{
            background: 'conic-gradient(from 202deg at 81.78% 23.22%, #4629F2 0deg, #13C6FF 125.62500357627869deg, #B94DFB 215.62499284744263deg, #FF53EE 294.3749928474426deg, #F3B960 360deg), #D9D9D9',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
        }}>
            <div className="p-[30px] bg-white bg-opacity-0 rounded-tl-lg rounded-tr-lg backdrop-blur-[50px] flex-col justify-start items-start gap-5 inline-flex">
                <div className="self-stretch justify-between items-start inline-flex">
                    <div className="w-[60px] h-[60px] bg-white rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="#4629F2">
                            <path d="M9.42116 22C8.10113 22 6.86627 21.762 5.71657 21.2861C4.56687 20.8102 3.5662 20.1072 2.71457 19.177C1.88423 18.2468 1.22422 17.1003 0.734531 15.7375C0.244844 14.3746 0 12.8171 0 11.0649C0 9.33432 0.244844 7.78761 0.734531 6.42478C1.24551 5.04031 1.92681 3.87217 2.77844 2.92035C3.65136 1.96853 4.66267 1.24385 5.81238 0.746313C6.98337 0.248771 8.22888 0 9.5489 0C10.8689 0 12.0399 0.270403 13.0619 0.811209C14.0838 1.35201 14.9248 1.97935 15.5848 2.69322L13.6048 5.12684C13.0512 4.5644 12.4551 4.12094 11.8164 3.79646C11.1776 3.45034 10.4538 3.27729 9.64471 3.27729C8.79308 3.27729 8.00532 3.46116 7.28144 3.82891C6.57884 4.17502 5.96141 4.68338 5.42914 5.35398C4.91816 6.00295 4.51364 6.80334 4.21557 7.75516C3.93879 8.70698 3.8004 9.77778 3.8004 10.9676C3.8004 13.3904 4.31138 15.294 5.33333 16.6785C6.37658 18.0413 7.78177 18.7227 9.5489 18.7227C10.4857 18.7227 11.316 18.528 12.0399 18.1386C12.7638 17.7276 13.4238 17.1976 14.02 16.5487L16 18.9174C15.1484 19.9125 14.169 20.6804 13.0619 21.2212C11.976 21.7404 10.7625 22 9.42116 22Z"/>
                        </svg>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-[100px] justify-center items-center gap-2 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-white text-3xl font-bold font-['Source Sans Pro']">Charlie</div>
                    <div className="w-[370px] text-white text-base font-normal font-['Source Sans Pro'] leading-7">Talk to me, I’m lonely.</div>
                </div>
            </div>
        </div>
    );
};