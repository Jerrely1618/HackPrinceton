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
            <CreditCardForm setCardData={setCardData} onClose={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewCard;
