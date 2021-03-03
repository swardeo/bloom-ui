import React from 'react';
import { FormControl, TextField, InputAdornment } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const MonthlyAmountField = ({
    helperText,
    error,
    disabled,
    control,
    defaultValue,
}) => {
    return (
        <FormControl fullWidth variant="outlined">
            <Controller
                name="monthlyAmount"
                as={
                    <TextField
                        id="monthlyAmount"
                        helperText={helperText}
                        variant="outlined"
                        label="Monthly Amount *"
                        error={error}
                        placeholder="0.00"
                        type="number"
                        InputProps={{
                            inputProps: { step: 0.01 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    £
                                </InputAdornment>
                            ),
                        }}
                        disabled={disabled}
                    />
                }
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required: 'Required',
                    pattern: {
                        value: /^[-]?[0-9]+\.[0-9][0-9]$/i,
                        message: 'Please enter a decimal to 2 places (x.xx)',
                    },
                }}
            />
        </FormControl>
    );
};

export default MonthlyAmountField;
