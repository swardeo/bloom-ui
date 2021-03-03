import React from 'react';
import {
    FormControl,
    TextField,
    InputAdornment,
    Grid,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

const AdjustmentFields = ({
    fieldName,
    amountHelperText,
    amountError,
    amountDefaultValue,
    dateFromHelperText,
    dateFromError,
    dateFromDefaultValue,
    rateHelperText,
    rateError,
    rateDefaultValue,
    disabled,
    control,
}) => {
    return (
        <>
            <Grid item sm={3} xs={6}>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name={`${fieldName}.amount`}
                        as={
                            <TextField
                                id={`${fieldName}.amount`}
                                helperText={amountHelperText}
                                variant="outlined"
                                label="Monthly Amount *"
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
            <Grid item sm={3} xs={6}>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name={`${fieldName}.dateFrom`}
                        as={
                            <TextField
                                id={`${fieldName}.dateFrom`}
                                helperText={dateFromHelperText}
                                variant="outlined"
                                label="Date From *"
                                error={dateFromError}
                                placeholder="yyyy-MM"
                                disabled={disabled}
                            />
                        }
                        control={control}
                        defaultValue={dateFromDefaultValue}
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
            <Grid item sm={3} xs={6}>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name={`${fieldName}.rate`}
                        as={
                            <TextField
                                id={`${fieldName}.rate`}
                                helperText={rateHelperText}
                                variant="outlined"
                                label="Yearly Rate *"
                                error={rateError}
                                placeholder="0.00"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        step: 0.01,
                                    },
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
                        defaultValue={rateDefaultValue}
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
        </>
    );
};

export default AdjustmentFields;
