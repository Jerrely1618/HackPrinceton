"use client";

import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { TextField, Grid, Button, InputAdornment } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const getCardType = (number: string) => {
  if (/^4\d{0,}$/.test(number)) return "visa";
  if (/^5[1-5]\d{0,}$/.test(number)) return "mastercard";
  if (/^3[47]\d{0,}$/.test(number)) return "amex";
  return "unknown";
};
interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCardData: (data: CardFormData) => void;
}

interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardHolderName: string;
  cardType?: string;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({
  isOpen,
  onClose,
  setCardData,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CardFormData>();
  const [cardType, setCardType] = useState<string>("unknown");

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement; // Cast to the expected type
    const number = target.value;
    const type = getCardType(number);
    setCardType(type);
    setValue("cardNumber", number, { shouldValidate: true });
  };
  const handleUploadCreditInfo = async(cardData) =>{
    try {
      const response = await axios.post(
        "http://localhost:5000/verbwire",
        cardData
      );
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting card data. Please try again.");
    }
  }
  const onSubmit: SubmitHandler<CardFormData> = (data) => {
    const fullData = {...data, cardType };
    setCardData(fullData);
    handleUploadCreditInfo(fullData);
    onClose();
  };

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
        />
        <motion.div
          className="relative bg-white rounded-lg p-6 z-50 w-2/3"
          style={{ zIndex: 1051 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Card Number Field */}
              <Grid item xs={12}>
                <Controller
                  name="cardNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Credit card number is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        handleCardNumberChange(e);
                        field.onChange(e);
                      }}
                      fullWidth
                      type="tel"
                      label="Credit card number"
                      variant="filled"
                      error={!!errors.cardNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {/* Render SVG based on cardType */}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              {/* Expiry Date Field */}
              <Grid item xs={6}>
                <TextField
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                  label="Expiry Date"
                  type="text"
                  variant="filled"
                  fullWidth
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                />
              </Grid>
              {/* CVC Field */}
              <Grid item xs={6}>
                <TextField
                  {...register("cvc", { required: "CVC is required" })}
                  label="CVC"
                  type="text"
                  variant="filled"
                  fullWidth
                  error={!!errors.cvc}
                  helperText={errors.cvc?.message}
                />
              </Grid>
              {/* Cardholder's Name Field */}
              <Grid item xs={12}>
                <TextField
                  {...register("cardHolderName", {
                    required: "Name on card is required",
                  })}
                  label="Name on Card"
                  type="text"
                  variant="filled"
                  fullWidth
                  error={!!errors.cardHolderName}
                  helperText={errors.cardHolderName?.message}
                />
              </Grid>
              {/* Submit and Close Buttons */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={onClose}
                  style={{ marginLeft: "10px" }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreditCardModal;
