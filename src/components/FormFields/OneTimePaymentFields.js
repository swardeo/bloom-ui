import React from 'react';
import {
    FormControl,
    TextField,
    InputAdornment,
    Grid,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

const OneTimePaymentFields = ({
    fieldName,
    amountHelperText,
    amountError,
    amountDefaultValue,
    dateHelperText,
    dateError,
    dateDefaultValue,
    disabled,
    control,
}) => {
    return (
        <>
            <Grid item sm={3} xs={5}>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name={`${fieldName}.amount`}
                        as={
                            <TextField
                                id={`${fieldName}.amount`}
                                helperText={amountHelperText}
                                variant="outlined"
                                label="One Time Amount *"
                                error={amountError}
                                placeholder="0.00"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        step: 0.01,
                                    },
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
                        defaultValue={amountDefaultValue}
                        rules={{
                            required: 'Required',
                            pattern: {
                                value: /^[-]?[0-9]+\.[0-9][0-9]$/i,
                                message:
                                    'Please enter a decimal to 2 places (x.xx)',
                            },
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item sm={3} xs={5}>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name={`${fieldName}.date`}
                        as={
                            <TextField
                                id={`${fieldName}.date`}
                                helperText={dateHelperText}
                                variant="outlined"
                                label="Date *"
                                error={dateError}
                                placeholder="yyyy-MM"
                                disabled={disabled}
                            />
                        }
                        control={control}
                        defaultValue={dateDefaultValue}
                        rules={{
                            required: 'Required',
                            pattern: {
                                value: /^[0-9]{4}-[0-9]{2}$/i,
                                message:
                                    'Please enter a date in the form yyyy-MM',
                            },
                        }}
                    />
                </FormControl>
            </Grid>
        </>
    );
};

export default OneTimePaymentFields;
