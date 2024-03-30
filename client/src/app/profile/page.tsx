// profile.tsx
import React from 'react';

export default function Profile () {
  return (
    <main className='flex bg-profile w-full h-screen justify-center m-10'>
      <section className="left w-1/3">

        <div>
          <h1 className='text-5xl'>Welcome</h1>
          <h2 className='text-xl'>Placeholder</h2>
        </div>
        <div className="balance bg-white m-1 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          Your <span className='text-3xl'>Balance</span>
        </div>
        <div className="cash-iq bg-white m-1 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          Your <span className='text-3xl'>CashIQ</span>
        </div>
      </section>
      <section className="middle w-1/3">
        <div className="spending-analyzer bg-white m-5 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          PlaceHolder
        </div>
        <div className="spending-analyzer bg-white m-5 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          Your Spending Analyzer
        </div>
      </section>
      <section className="right w-1/3"  id='right'>
        <h2>Placeholder Chat</h2>
      </section>
    </main>
  );
};
