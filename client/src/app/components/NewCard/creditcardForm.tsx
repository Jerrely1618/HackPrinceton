import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, Button, InputAdornment } from '@mui/material';
const getCardType = (number: string) => {
  const visaRegex = /^4\d{0,}$/;
  const mastercardRegex = /^5[1-5]\d{0,}$/;
  const amexRegex = /^3[47]\d{0,}$/;

  if (visaRegex.test(number)) return 'visa';
  if (mastercardRegex.test(number)) return 'mastercard';
  if (amexRegex.test(number)) return 'amex';

  return 'unknown';
};

const CreditCardForm: React.FC<{ onClose: () => void, setCardData: (data: any) => void }> = ({ onClose, setCardData }) => {
  const { control, handleSubmit, register, formState: { errors }, setValue, trigger } = useFormContext();
    const [cardType, setCardType] = useState('unknown');

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;
    const type = getCardType(number);
    setCardType(type);
    setValue('payment.cardnumber', number); 
    trigger('payment.cardnumber');
    };

  const renderCardIcon = () => {
  switch (cardType) {
    case 'visa':
      return (
        <svg viewBox="0 0 50 30">
          <rect width="50" height="30" rx="5" fill="#14279B" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14">VISA</text>
        </svg>
      );
    case 'mastercard':
      return (
        <svg viewBox="0 0 50 30">
          <rect width="50" height="30" rx="5" fill="#EB001B" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14">MasterCard</text>
        </svg>
      );
    case 'amex':
      return (
        <svg viewBox="0 0 50 30">
          <rect width="50" height="30" rx="5" fill="#0076BF" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14">AMEX</text>
        </svg>
      );
    default:
      return null; 
  }
};

const onSubmit = (data) => {
    const fullData = {
      ...data,
      cardType,
    };
    setCardData(fullData); 
    onClose(); 
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Controller
          name="payment.cardnumber"
          control={control}
          defaultValue=""
          rules={{ required: 'Credit card number is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleCardNumberChange}
              fullWidth
              type="tel"
              label="Credit card number"
              variant="filled"
              error={!!errors['payment.cardnumber']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {renderCardIcon()}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...register('expiryDate', { required: 'Expiry date is required' })}
          error={!!errors.expiryDate}
          fullWidth
          label="Expiry Date"
          variant="filled"
          onChange={e => {
            setValue('expiryDate', e.target.value);
            trigger('expiryDate');
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          {...register('cvc', { required: 'CVC is required' })}
          error={!!errors.cvc}
          fullWidth
          label="CVC"
          variant="filled"
          onChange={e => {
            setValue('cvc', e.target.value);
            trigger('cvc');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          fullWidth
          label="Name on Card"
          variant="filled"
          onChange={e => {
            setValue('name', e.target.value);
            trigger('name');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" type="button" onClick={handleSubmit(onSubmit)}>
        Submit
    </Button>

        <Button variant="contained" onClick={onClose} style={{ marginLeft: '10px' }}>
            Close
        </Button>
        </Grid>
    </Grid>
  );
};

export default CreditCardForm;
