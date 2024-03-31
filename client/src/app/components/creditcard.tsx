import React, { useRef, useState, FC } from "react";

type CardData = {
  cardNumber?: string;
  cardHolderName?: string;
  cardType?: string;
  expiryDate?: string;
};
interface CreditCardProps {
  cardData: CardData;
}
const CreditCard: FC<CreditCardProps> = ({ cardData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - cardRect.left - cardRect.width / 2;
    const y = e.clientY - cardRect.top - cardRect.height / 2;
    const rotateX = (y / cardRect.height) * 15; // Adjust rotation sensitivity here
    const rotateY = (x / cardRect.width) * -15; // Adjust rotation sensitivity here

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  return (
    <div className="" onMouseMove={handleMouseMove}>
      <div
        className="card relative w-96 h-52 bg-gray-700/40 backdrop-blur-lg border border-gray-200/20 shadow-lg rounded-lg"
        ref={cardRef}
        style={{ transform: transform, transition: "transform 0.1s ease-out" }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <p className="text-white font-semibold">SAPPHIRE RESERVE</p>
            </div>
            <div className="w-14 h-9">
              <img
                src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png"
                alt="chip"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <h3 className="text-white font-mono">{cardData?.cardNumber}</h3>
              <h3 className="text-white font-mono">
                {cardData?.cardHolderName || "C. Chaurasia"}
              </h3>
              <h3 className="text-white font-mono">{cardData?.expiryDate}</h3>
            </div>
            <div className="text-right">
              <img
                src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/Visa-Logo-PNG-Image.png"
                alt="Visa"
                className="w-16 h-auto"
              />
              <p className="text-white text-sm mt-1">Infinite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
