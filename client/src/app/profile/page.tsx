// profile.tsx
import React from 'react';
import bg_profile from "../../../publicc"


export default function Profile () {
  return (
    <main className='flex w-full h-screen'>
      <section className="left">
        <nav>

        </nav>
        <div>
          <h1>Welcome</h1>
          <h2>Placeholder</h2>
        </div>
        <div className="balance bg-white kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 m-5 rounded-lg">
          Your <span className='text-3xl'>Balance</span>
        </div>
        <div className="cash-iq bg-white m-5 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          Your <span className='text-3xl'>CashIQ</span>
        </div>
      </section>
      <section className="middle">
        <div className="spending-analyzer bg-white m-5 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          PlaceHolder
        </div>
        <div className="spending-analyzer bg-white m-5 kufam-font bg-opacity-10 backdrop-blur-sm shadow-lg p-6 rounded-lg">
          Your Spending Analyzer
        </div>
      </section>
      <section className="right"  id='right'>
        <h2>Placeholder</h2>
      </section>
    </main>
  );
};
