import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const NameField = ({ helperText, error, disabled, control, defaultValue }) => {
    return (
        <FormControl fullWidth variant="outlined">
            <Controller
                name="name"
                as={
                    <TextField
                        id="name"
                        helperText={helperText}
                        variant="outlined"
                        label="Name *"
                        error={error}
                        disabled={disabled}
                    />
                }
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required: 'Required',
                }}
            />
        </FormControl>
    );
};

export default NameField;
