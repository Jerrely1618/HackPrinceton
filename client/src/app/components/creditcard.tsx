import React, { useRef, useState } from 'react';

const CreditCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - cardRect.left - cardRect.width / 2;
    const y = e.clientY - cardRect.top - cardRect.height / 2;
    const rotateX = (y / cardRect.height) * 15;
    const rotateY = (x / cardRect.width) * -15;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return (
    <div className=''
         onMouseMove={handleMouseMove}>
      <div className="card relative w-80 h-52 bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-lg rounded-lg"
           ref={cardRef} 
           style={{ transform: transform, transition: 'transform 0.1s ease-out' }}>
        <div className='p-4 h-full flex flex-col justify-between'>
          <div className='flex justify-between items-start'>
            <div className='space-y-1'>
              <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                <div className='w-2 h-2 bg-black rounded-full'></div>
              </div>
              <p className='text-white font-semibold'>SAPPHIRE RESERVE</p>
            </div>
            <div className="w-14 h-9">
              <img src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png" alt="chip" className="w-full h-full object-cover"/>
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex flex-col'>
            <h3 className='text-white font-mono'>...6532</h3>
            <h3 className='text-white font-mono'>C. Chauras</h3>
            </div>
            <div className='text-right'>
              <img src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/Visa-Logo-PNG-Image.png" alt="Visa" className="w-16 h-auto"/>
              <p className='text-white text-sm mt-1'>Infinite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
