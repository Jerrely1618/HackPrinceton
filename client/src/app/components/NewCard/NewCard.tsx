import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Cards from 'react-credit-cards-2'
export default function NewCard ({ isOpen, onClose}){
const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: false,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (e) => {
    setCardInfo((prev) => ({ ...prev, focus: e.target.name }));
  }
  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50" // Updated z-index
          style={{ zIndex: 1050 }} // Inline style for higher specificity
        >
          
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <motion.div
            className="relative bg-white rounded-lg p-6 z-50 w-1/2" // Ensure this is sufficiently high
            style={{ zIndex: 1051 }} // Inline style for even higher specificity
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
