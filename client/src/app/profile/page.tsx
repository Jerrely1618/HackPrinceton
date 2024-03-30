"use client"

import React, { useState, useEffect } from 'react';
const background_div = "bg-white kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg hover:shadow-2xl hover:bg-opacity-16 transition-shadow duration-300";
const sections = "w-1/3 m-2"
import NewCard from "../components/NewCard/NewCard.tsx";
import { AnimatePresence } from "framer-motion"
import Chat from "../components/chat"
export default function Profile () {
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  useEffect(() => {
    setIsNewCardOpen(true)
  },[])
  const closeNewCard = () => {
    setIsNewCardOpen(false);
  };

  return (
    <main className='flex text-white p-4 w-full h-full justify-center' style={{
  background: "radial-gradient(32.55% 67.71% at 47.09% 32.29%, #2E2277 0%, #000000 99.74%)"
}}>
  <div className='z-100'>
    {isNewCardOpen && (
              <AnimatePresence>
                  <NewCard
                    isOpen={setIsNewCardOpen}
                    onClose={closeNewCard}
                  />
              </AnimatePresence>)}
              </div>
      <section className={`left space-y-6 ${sections}`}>

        <div className='flex space-x-3 pl-5'>
          <svg width="72" height="74" viewBox="0 0 72 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 18.5C33.775 18.5 31.5999 19.1781 29.7498 20.4486C27.8998 21.7191 26.4578 23.525 25.6064 25.6377C24.7549 27.7505 24.5321 30.0753 24.9662 32.3182C25.4003 34.5611 26.4717 36.6214 28.0451 38.2384C29.6184 39.8555 31.623 40.9567 33.8052 41.4028C35.9875 41.849 38.2495 41.62 40.3052 40.7449C42.3609 39.8697 44.1179 38.3877 45.354 36.4863C46.5902 34.5848 47.25 32.3493 47.25 30.0625C47.25 26.9959 46.0647 24.055 43.955 21.8866C41.8452 19.7182 38.9837 18.5 36 18.5ZM36 37C34.665 37 33.3599 36.5931 32.2499 35.8308C31.1399 35.0685 30.2747 33.985 29.7638 32.7174C29.2529 31.4497 29.1193 30.0548 29.3797 28.7091C29.6402 27.3633 30.283 26.1272 31.227 25.1569C32.171 24.1867 33.3738 23.526 34.6831 23.2583C35.9925 22.9906 37.3497 23.128 38.5831 23.6531C39.8165 24.1782 40.8707 25.0674 41.6124 26.2082C42.3541 27.3491 42.75 28.6904 42.75 30.0625C42.748 31.9018 42.0362 33.6652 40.7707 34.9658C39.5053 36.2663 37.7896 36.9979 36 37Z" fill="white"/>
            <path d="M36 4.625C29.7699 4.625 23.6797 6.52376 18.4996 10.0812C13.3194 13.6386 9.28197 18.6949 6.89781 24.6106C4.51365 30.5264 3.88984 37.0359 5.10528 43.316C6.32071 49.5962 9.3208 55.3649 13.7261 59.8926C18.1315 64.4203 23.7443 67.5037 29.8547 68.7529C35.9651 70.0021 42.2987 69.361 48.0545 66.9106C53.8104 64.4602 58.73 60.3106 62.1913 54.9866C65.6526 49.6625 67.5 43.4032 67.5 37C67.4906 28.4166 64.1688 20.1875 58.2635 14.1181C52.3581 8.0487 44.3514 4.63467 36 4.625ZM22.5 60.9957V57.8125C22.502 55.9732 23.2138 54.2098 24.4792 52.9092C25.7447 51.6086 27.4604 50.877 29.25 50.875H42.75C44.5396 50.877 46.2554 51.6086 47.5208 52.9092C48.7863 54.2098 49.498 55.9732 49.5 57.8125V60.9957C45.4031 63.4543 40.7442 64.75 36 64.75C31.2558 64.75 26.5969 63.4543 22.5 60.9957ZM53.9831 57.6409C53.9384 54.6075 52.7358 51.7136 50.6346 49.5828C48.5334 47.4521 45.7018 46.2552 42.75 46.25H29.25C26.2982 46.2552 23.4666 47.4521 21.3654 49.5828C19.2642 51.7136 18.0616 54.6075 18.0169 57.6409C13.9367 53.8964 11.0593 48.9664 9.76577 43.5038C8.47225 38.0412 8.82361 32.3036 10.7733 27.0508C12.723 21.798 16.1791 17.2778 20.684 14.0886C25.1888 10.8994 30.5299 9.19178 36 9.19178C41.4701 9.19178 46.8112 10.8994 51.3161 14.0886C55.8209 17.2778 59.277 21.798 61.2267 27.0508C63.1764 32.3036 63.5278 38.0412 62.2343 43.5038C60.9407 48.9664 58.0634 53.8964 53.9831 57.6409Z" fill="white"/>
          </svg>
          <h1 className='text-5xl'>Welcome</h1>
          <h2 className='text-xl pt-5'>Placeholder</h2>
        </div>
        <div className='bg-white bg-opacity-10 space-y-5 rounded-lg m-2 p-5'>
        <div className={`m-1 flex space-y-1 flex-col ${background_div}`}>
          <span className='font-semibold'>Your <span className='italic text-3xl font-bold'>Balance</span></span>
          <span className='text-6xl '>$1000</span>
          <span className='text-green-500 font-bold'>+10% from last month</span>
        </div>
        <div className={`cash-iq space-y-1 m-1 flex flex-col ${background_div}`}>
          <span className='font-semibold'>Your <span className='text-3xl font-bold'>CashIQ</span></span>
          <span className='text-xl'><span className='text-6xl'>70/</span>100</span>
          <span className='text-red-500 font-bold'>-20pt from last week</span>
        </div>
        <div className={`cash-iq m-1 flex flex-col ${background_div}`}>
    <h2 className='text-4xl font-bold space-y-1'>Recommendations</h2>
    <ul className="list-disc pl-5 pt-2">
      <li>Spend less on Uber Eats</li>
      <li>Spend less on Grocery</li>
      <li>Invest in Nvidia, Palo Alto Networks</li>
      <li>Spend less on Doordash</li>
    </ul>
  </div>
        </div>
      </section>
      <section className={`middle ${sections}`}>
        <div className={`spending-analyzer ${background_div}`}>
          PlaceHolder
        </div>
        <div className={`spending-analyzer `}>

        </div>
      </section>
      <section className={`right ${sections}`}  id='right'>
        <Chat />
      </section>
    </main>
  );
};
