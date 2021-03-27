import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const EndDateField = ({
    helperText,
    error,
    disabled,
    control,
    defaultValue,
}) => {
    return (
        <FormControl fullWidth variant="outlined">
            <Controller
                name="endDate"
                as={
                    <TextField
                        id="endDate"
                        helperText={helperText}
                        variant="outlined"
                        label="End Date *"
                        error={error}
                        placeholder="yyyy-MM"
                        disabled={disabled}
                    />
                }
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required: 'Required',
                    pattern: {
                        value: /^[0-9]{4}-[0-9]{2}$/i,
                        message: 'Please enter a date in the form yyyy-MM',
                    },
                }}
            />
        </FormControl>
    );
};

export default EndDateField;
