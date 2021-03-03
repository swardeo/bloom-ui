import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const StartDateField = ({
    helperText,
    error,
    disabled,
    control,
    defaultValue,
}) => {
    return (
        <FormControl fullWidth variant="outlined">
            <Controller
                name="startDate"
                as={
                    <TextField
                        id="startDate"
                        helperText={helperText}
                        variant="outlined"
                        label="Start Date *"
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

export default StartDateField;
