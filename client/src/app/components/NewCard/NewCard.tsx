// NewCard.tsx
import React from 'react';
import CreditCardForm from './creditcardForm';
import { AnimatePresence, motion } from 'framer-motion';
interface NewCardProps {
  isOpen: boolean;
  onClose: () => void;
  setCardData: (data: any) => void; 
}

const NewCard: React.FC<NewCardProps & { setCardData: React.Dispatch<React.SetStateAction<any[]>>; }> = ({ isOpen, onClose, setCardData }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50" 
          style={{ zIndex: 1050 }} 
        >
          
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <motion.div
            className="relative bg-white rounded-lg p-6 z-50 w-1/2"
            style={{ zIndex: 1051 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-black">Add a New Card</h2>
            <div>
      <Cards
        number={cardInfo.number}
        expiry={cardInfo.expiry}
        cvc={cardInfo.cvc}
        name={cardInfo.name} 
        focused={cardInfo.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={cardInfo.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="expiry"
          name="expiry"
          placeholder="Expire Date"
          value={cardInfo.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="cvc"
          name="cvc"
          placeholder="CVC"
          value={cardInfo.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="Name"
          name="Name"
          placeholder="Cardholder Name"
          value={cardInfo.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
    </div>
            <div className="flex justify-end">
              <button
                className="bg-secondary text-white px-4 py-2 rounded mr-4"
              >
                Add Card
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default NewCard;
