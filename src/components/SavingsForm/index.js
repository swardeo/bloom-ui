import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Divider,
    Grid,
    Hidden,
    IconButton,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { API } from 'aws-amplify';
import config from '../../config';
import { useHistory, Redirect } from 'react-router-dom';
import validateSaving from '../../util/validateSaving';
import {
    NameField,
    StartAmountField,
    MonthlyAmountField,
    StartDateField,
    EndDateField,
    YearlyRateField,
    AdjustmentFields,
    OneTimePaymentFields,
} from '../FormFields';

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
                    <NameField
                        helperText={
                            fieldsErrors.name ? fieldsErrors.name.message : null
                        }
                        error={!!fieldsErrors.name}
                        disabled={action === 'update'}
                        control={control}
                        defaultValue={defaultValues.name}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <StartAmountField
                        helperText={
                            fieldsErrors.startAmount
                                ? fieldsErrors.startAmount.message
                                : null
                        }
                        error={!!fieldsErrors.startAmount}
                        disabled={!active}
                        control={control}
                        defaultValue={defaultValues.startAmount}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <MonthlyAmountField
                        helperText={
                            fieldsErrors.monthlyAmount
                                ? fieldsErrors.monthlyAmount.message
                                : null
                        }
                        error={!!fieldsErrors.monthlyAmount}
                        disabled={!active}
                        control={control}
                        defaultValue={defaultValues.monthlyAmount}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <StartDateField
                        helperText={
                            fieldsErrors.startDate
                                ? fieldsErrors.startDate.message
                                : null
                        }
                        error={!!fieldsErrors.startDate}
                        disabled={!active}
                        control={control}
                        defaultValue={defaultValues.startDate}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <EndDateField
                        helperText={
                            fieldsErrors.endDate
                                ? fieldsErrors.endDate.message
                                : null
                        }
                        error={!!fieldsErrors.endDate}
                        disabled={!active}
                        control={control}
                        defaultValue={defaultValues.endDate}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <YearlyRateField
                        helperText={
                            fieldsErrors.yearlyRate
                                ? fieldsErrors.yearlyRate.message
                                : null
                        }
                        error={!!fieldsErrors.yearlyRate}
                        disabled={!active}
                        control={control}
                        defaultValue={defaultValues.yearlyRate}
                    />
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
                                <AdjustmentFields
                                    fieldName={fieldName}
                                    amountHelperText={
                                        fieldsErrors.adjustments?.[index]
                                            ?.amount
                                            ? fieldsErrors.adjustments?.[index]
                                                  ?.amount?.message
                                            : null
                                    }
                                    amountError={
                                        !!fieldsErrors.adjustments?.[index]
                                            ?.amount
                                    }
                                    amountDefaultValue={values.amount}
                                    dateFromHelperText={
                                        fieldsErrors.adjustments?.[index]
                                            ?.dateFrom
                                            ? fieldsErrors.adjustments?.[index]
                                                  ?.dateFrom?.message
                                            : null
                                    }
                                    dateFromError={
                                        !!fieldsErrors.adjustments?.[index]
                                            ?.dateFrom
                                    }
                                    dateFromDefaultValue={values.dateFrom}
                                    rateHelperText={
                                        fieldsErrors.adjustments?.[index]?.rate
                                            ? fieldsErrors.adjustments?.[index]
                                                  ?.rate?.message
                                            : null
                                    }
                                    rateError={
                                        !!fieldsErrors.adjustments?.[index]
                                            ?.rate
                                    }
                                    rateDefaultValue={values.rate}
                                    disabled={!active}
                                    control={control}
                                />
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
                                <OneTimePaymentFields
                                    fieldName={fieldName}
                                    amountHelperText={
                                        fieldsErrors.oneTimePayments?.[index]
                                            ?.amount
                                            ? fieldsErrors.oneTimePayments?.[
                                                  index
                                              ]?.amount?.message
                                            : null
                                    }
                                    amountError={
                                        !!fieldsErrors.oneTimePayments?.[index]
                                            ?.amount
                                    }
                                    amountDefaultValue={values.amount}
                                    dateHelperText={
                                        fieldsErrors.oneTimePayments?.[index]
                                            ?.date
                                            ? fieldsErrors.oneTimePayments?.[
                                                  index
                                              ]?.date?.message
                                            : null
                                    }
                                    dateError={
                                        !!fieldsErrors.oneTimePayments?.[index]
                                            ?.date
                                    }
                                    dateDefaultValue={values.date}
                                    disabled={!active}
                                    control={control}
                                />
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
