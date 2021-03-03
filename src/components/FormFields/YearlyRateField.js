import React from 'react';
import { FormControl, TextField, InputAdornment } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const YearlyRateField = ({
    helperText,
    error,
    disabled,
    control,
    defaultValue,
}) => {
    return (
        <FormControl fullWidth variant="outlined">
            <Controller
                name="yearlyRate"
                as={
                    <TextField
                        id="yearlyRate"
                        helperText={helperText}
                        variant="outlined"
                        label="Yearly Rate *"
                        error={error}
                        placeholder="0.00"
                        type="number"
                        InputProps={{
                            inputProps: { step: 0.01 },
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
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

export default YearlyRateField;
