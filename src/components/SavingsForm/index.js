import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Divider,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { API } from 'aws-amplify';
import config from '../../config';
import { useHistory, Redirect } from 'react-router-dom';
import validateSaving from '../../util/validateSaving';

const StyledRemoveButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    height: '1px',
    backgroundColor: theme.palette.primary.light,
}));

const StyledFieldSet = styled('fieldset')({
    border: 'none',
    width: '100%',
});

const CenteredGridItem = styled(Grid)({
    textAlign: 'center',
});

const createNumberedArray = (length) => {
    return Array.from({ length }, (_, k) => k);
};

const SavingsForm = ({ action, saving }) => {
    const [active, setActive] = useState(true);
    const [adjustmentIndexes, setAdjustmentIndexes] = useState([]);
    const [adjustmentCounter, setAdjustmentCounter] = useState(0);
    const [oneTimePaymentIndexes, setOneTimePaymentIndexes] = useState([]);
    const [oneTimePaymentCounter, setOneTimePaymentCounter] = useState(0);
    const [redirect, setRedirect] = useState('');
    const [performingAction, setPerformingAction] = useState(false);
    const [validationFeedback, setValidationFeedback] = useState('success');
    const { handleSubmit, control, errors: fieldsErrors } = useForm();
    const history = useHistory();

    const defaultValues = JSON.parse(JSON.stringify(saving));

    const defaultAdjustment = {
        amount: '',
        dateFrom: '',
        rate: '',
    };

    const defaultOneTimePayment = {
        amount: '',
        date: '',
    };

    useEffect(() => {
        if (action === 'update') {
            setAdjustmentIndexes(
                createNumberedArray(saving.adjustments.length)
            );
            setAdjustmentCounter(saving.adjustments.length);
            setOneTimePaymentIndexes(
                createNumberedArray(saving.oneTimePayments.length)
            );
            setOneTimePaymentCounter(saving.oneTimePayments.length);
            setActive(false);
            if (saving?.adjustments?.length > 0) {
                saving.adjustments.sort(
                    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
                );
            }
            if (saving?.oneTimePayments?.length > 0) {
                saving.oneTimePayments.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
            }
        }
    }, [action, saving]);

    const onSubmit = async (saving) => {
        const validation = validateSaving(saving);
        setValidationFeedback(validation);
        if (validation === 'success') {
            setPerformingAction(true);
            if (action === 'add') {
                await API.post(config.api.NAME, '/savings', { body: saving })
                    .then(() => {
                        setRedirect('/savings');
                    })
                    .catch(() => {
                        setRedirect('/oops');
                    });
            } else {
                await API.put(config.api.NAME, `/savings/${saving.name}`, {
                    body: saving,
                })
                    .then(() => {
                        setRedirect('/savings');
                    })
                    .catch(() => {
                        setRedirect('/oops');
                    });
            }
        }
    };

    const addAdjustment = () => {
        setAdjustmentIndexes((prevIndexes) => [
            ...prevIndexes,
            adjustmentCounter,
        ]);
        setAdjustmentCounter((prevCounter) => prevCounter + 1);
    };

    const removeAdjustment = (index) => () => {
        setAdjustmentIndexes((prevIndexes) => [
            ...prevIndexes.filter((item) => item !== index),
        ]);
        setAdjustmentCounter((prevCounter) => prevCounter - 1);
    };

    const addOneTimePayment = () => {
        setOneTimePaymentIndexes((prevIndexes) => [
            ...prevIndexes,
            oneTimePaymentCounter,
        ]);
        setOneTimePaymentCounter((prevCounter) => prevCounter + 1);
    };

    const removeOneTimePayment = (index) => () => {
        setOneTimePaymentIndexes((prevIndexes) => [
            ...prevIndexes.filter((item) => item !== index),
        ]);
        setOneTimePaymentCounter((prevCounter) => prevCounter - 1);
    };

    if (redirect === '/savings') {
        history.go(0);
    } else if (redirect) {
        return <Redirect to={redirect} />;
    }
    if (performingAction) {
        return (
            <Grid container justify="center">
                <CircularProgress />
            </Grid>
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="name"
                            as={
                                <TextField
                                    id="name"
                                    helperText={
                                        fieldsErrors.name
                                            ? fieldsErrors.name.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="Name *"
                                    error={!!fieldsErrors.name}
                                    disabled={action === 'update'}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.name}
                            rules={{
                                required: 'Required',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="startAmount"
                            as={
                                <TextField
                                    id="startAmount"
                                    helperText={
                                        fieldsErrors.startAmount
                                            ? fieldsErrors.startAmount.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="Start Amount *"
                                    error={!!fieldsErrors.startAmount}
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
                                    disabled={!active}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.startAmount}
                            rules={{
                                required: 'Required',
                                pattern: {
                                    value: /^[0-9]+\.[0-9][0-9]$/i,
                                    message:
                                        'Please enter a non-negative decimal to 2 places (x.xx)',
                                },
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="monthlyAmount"
                            as={
                                <TextField
                                    id="monthlyAmount"
                                    helperText={
                                        fieldsErrors.monthlyAmount
                                            ? fieldsErrors.monthlyAmount.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="Monthly Amount *"
                                    error={!!fieldsErrors.monthlyAmount}
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
                                    disabled={!active}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.monthlyAmount}
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
                <Grid item sm={4} xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="startDate"
                            as={
                                <TextField
                                    id="startDate"
                                    helperText={
                                        fieldsErrors.startDate
                                            ? fieldsErrors.startDate.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="Start Date *"
                                    error={!!fieldsErrors.startDate}
                                    placeholder="yyyy-MM"
                                    disabled={!active}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.startDate}
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
                <Grid item sm={4} xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="endDate"
                            as={
                                <TextField
                                    id="endDate"
                                    helperText={
                                        fieldsErrors.endDate
                                            ? fieldsErrors.endDate.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="End Date *"
                                    error={!!fieldsErrors.endDate}
                                    placeholder="yyyy-MM"
                                    disabled={!active}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.endDate}
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
                <Grid item sm={4} xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="yearlyRate"
                            as={
                                <TextField
                                    id="yearlyRate"
                                    helperText={
                                        fieldsErrors.yearlyRate
                                            ? fieldsErrors.yearlyRate.message
                                            : null
                                    }
                                    variant="outlined"
                                    label="Yearly Rate *"
                                    error={!!fieldsErrors.yearlyRate}
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
                                    disabled={!active}
                                />
                            }
                            control={control}
                            defaultValue={defaultValues.yearlyRate}
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
                <Grid item xs={12}>
                    <Typography variant="h5">Adjustments:</Typography>
                </Grid>
                {adjustmentIndexes.map((index) => {
                    const fieldName = `adjustments[${index}]`;
                    const values =
                        defaultValues.adjustments.length > 0
                            ? defaultValues.adjustments.shift()
                            : defaultAdjustment;
                    return (
                        <StyledFieldSet name={fieldName} key={fieldName}>
                            <Grid
                                container
                                spacing={2}
                                justify="space-evenly"
                                alignContent="center"
                            >
                                <Grid item sm={3} xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <Controller
                                            name={`${fieldName}.amount`}
                                            as={
                                                <TextField
                                                    id={`${fieldName}.amount`}
                                                    helperText={
                                                        fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.amount
                                                            ? fieldsErrors
                                                                  .adjustments?.[
                                                                  index
                                                              ]?.amount?.message
                                                            : null
                                                    }
                                                    variant="outlined"
                                                    label="Monthly Amount *"
                                                    error={
                                                        !!fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.amount
                                                    }
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
                                                    disabled={!active}
                                                />
                                            }
                                            control={control}
                                            defaultValue={values.amount}
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
                                                    helperText={
                                                        fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.dateFrom
                                                            ? fieldsErrors
                                                                  .adjustments?.[
                                                                  index
                                                              ]?.dateFrom
                                                                  ?.message
                                                            : null
                                                    }
                                                    variant="outlined"
                                                    label="Date From *"
                                                    error={
                                                        !!fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.dateFrom
                                                    }
                                                    placeholder="yyyy-MM"
                                                    disabled={!active}
                                                />
                                            }
                                            control={control}
                                            defaultValue={values.dateFrom}
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
                                                    helperText={
                                                        fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.rate
                                                            ? fieldsErrors
                                                                  .adjustments?.[
                                                                  index
                                                              ]?.rate?.message
                                                            : null
                                                    }
                                                    variant="outlined"
                                                    label="Yearly Rate *"
                                                    error={
                                                        !!fieldsErrors
                                                            .adjustments?.[
                                                            index
                                                        ]?.rate
                                                    }
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
                                                    disabled={!active}
                                                />
                                            }
                                            control={control}
                                            defaultValue={values.rate}
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
                                <Grid item sm={1} xs={1}>
                                    {active && (
                                        <StyledRemoveButton
                                            onClick={removeAdjustment(index)}
                                        >
                                            <BackspaceIcon />
                                        </StyledRemoveButton>
                                    )}
                                </Grid>
                            </Grid>
                            {index < adjustmentCounter - 1 && (
                                <Hidden smUp>
                                    <StyledDivider variant="middle" />
                                </Hidden>
                            )}
                        </StyledFieldSet>
                    );
                })}
                {active && (
                    <CenteredGridItem item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addAdjustment}
                            disabled={!active}
                        >
                            Add Adjustment
                        </Button>
                    </CenteredGridItem>
                )}
                <Grid item xs={12}>
                    <Typography variant="h5">One Time Payments:</Typography>
                </Grid>
                {oneTimePaymentIndexes.map((index) => {
                    const fieldName = `oneTimePayments[${index}]`;
                    const values =
                        defaultValues.oneTimePayments.length > 0
                            ? defaultValues.oneTimePayments.shift()
                            : defaultOneTimePayment;
                    return (
                        <StyledFieldSet name={fieldName} key={fieldName}>
                            <Grid
                                container
                                spacing={2}
                                justify="space-evenly"
                                alignContent="center"
                            >
                                <Grid item sm={3} xs={5}>
                                    <FormControl fullWidth variant="outlined">
                                        <Controller
                                            name={`${fieldName}.amount`}
                                            as={
                                                <TextField
                                                    id={`${fieldName}.amount`}
                                                    helperText={
                                                        fieldsErrors
                                                            .oneTimePayments?.[
                                                            index
                                                        ]?.amount
                                                            ? fieldsErrors
                                                                  .oneTimePayments?.[
                                                                  index
                                                              ]?.amount?.message
                                                            : null
                                                    }
                                                    variant="outlined"
                                                    label="One Time Amount *"
                                                    error={
                                                        !!fieldsErrors
                                                            .oneTimePayments?.[
                                                            index
                                                        ]?.amount
                                                    }
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
                                                    disabled={!active}
                                                />
                                            }
                                            control={control}
                                            defaultValue={values.amount}
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
                                                    helperText={
                                                        fieldsErrors
                                                            .oneTimePayments?.[
                                                            index
                                                        ]?.date
                                                            ? fieldsErrors
                                                                  .oneTimePayments?.[
                                                                  index
                                                              ]?.date?.message
                                                            : null
                                                    }
                                                    variant="outlined"
                                                    label="Date *"
                                                    error={
                                                        !!fieldsErrors
                                                            .oneTimePayments?.[
                                                            index
                                                        ]?.date
                                                    }
                                                    placeholder="yyyy-MM"
                                                    disabled={!active}
                                                />
                                            }
                                            control={control}
                                            defaultValue={values.date}
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
                                <Grid item sm={1} xs={1}>
                                    {active && (
                                        <StyledRemoveButton
                                            onClick={removeOneTimePayment(
                                                index
                                            )}
                                        >
                                            <BackspaceIcon />
                                        </StyledRemoveButton>
                                    )}
                                </Grid>
                                <Grid item sm={4} />
                            </Grid>
                            {index < oneTimePaymentCounter - 1 && (
                                <Hidden smUp>
                                    <StyledDivider variant="middle" />
                                </Hidden>
                            )}
                        </StyledFieldSet>
                    );
                })}
                {active && (
                    <CenteredGridItem item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addOneTimePayment}
                        >
                            Add One Time Payment
                        </Button>
                    </CenteredGridItem>
                )}
                <CenteredGridItem item xs={12}>
                    <StyledDivider variant="middle" />
                </CenteredGridItem>
                {validationFeedback !== 'success' && (
                    <CenteredGridItem item xs={12}>
                        <Alert severity="error" variant="filled">
                            {validationFeedback}
                        </Alert>
                    </CenteredGridItem>
                )}
                <CenteredGridItem item xs={12}>
                    {action === 'update' && !active && (
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setActive(true)}
                        >
                            Edit
                        </Button>
                    )}
                    {active && (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                        >
                            {action === 'add' ? 'Add Saving' : 'Update Saving'}
                        </Button>
                    )}
                </CenteredGridItem>
            </Grid>
        </form>
    );
};

SavingsForm.defaultProps = {
    action: 'add',
    saving: {
        name: '',
        startAmount: '',
        monthlyAmount: '',
        startDate: '',
        endDate: '',
        yearlyRate: '',
        adjustments: [],
        oneTimePayments: [],
    },
};

SavingsForm.propTypes = {
    action: PropTypes.oneOf(['add', 'update']).isRequired,
    saving: PropTypes.object,
};

export default SavingsForm;
