// profile.tsx
import React from 'react';

export default function Profile () {
  const background_div = "bg-white kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg"
  const sections = "w-1/3 m-2"
  return (
    <main className='flex text-white p-2 w-full h-screen justify-center' style={{
  background: "radial-gradient(32.55% 67.71% at 47.09% 32.29%, #2E2277 0%, #000000 99.74%);"
}}>
      <section className={`left space-y-6 ${sections}`}>

        <div>
          <h1 className='text-5xl'>Welcome</h1>
          <h2 className='text-xl'>Placeholder</h2>
        </div>
        <div className={`balance bg-white flex flex-col m-1 ${background_div}`}>
          <span>Your <span className='text-3xl'>Balance</span></span>
          <span className='text-6xl'>$1000</span>
          <span className='text-green-500'>+10% from last month</span>
        </div>
        <div className={`cash-iq  m-1 flex flex-col ${background_div}`}>
          <span>Your <span className='text-3xl'>CashIQ</span></span>
          <span className='text-xl'><span className='text-6xl'>70/</span>100</span>
          <span className='text-green-500'>+10% from last month</span>
        </div>
        <div className={`cash-iq m-1 flex flex-col ${background_div}`}>
          <h2 className='text-xl'>Recomendations</h2>
          <span>Spend less on Uber Eats</span>
          <span>Spend less on Grocery</span>
          <span>Invest in Nvidia, Palo Alto Networks</span>
          <span>Spend less on Doordash</span>
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
        <h2>Placeholder Chat</h2>
      </section>
    </main>
  );
};
