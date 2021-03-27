import {
    isEmpty,
    isInvalidDate,
    isNegative,
    validateAdjustments,
    validateOneTimePayments,
} from './validationUtils';

const validateSaving = (saving) => {
    if (isEmpty(saving.name)) {
        return 'Saving name should not be blank.';
    }
    if (isNegative(saving.startAmount)) {
        return 'Saving start amount should not be negative.';
    }
    if (isInvalidDate(saving.startDate) || isInvalidDate(saving.endDate)) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }

    const startDate = new Date(saving.startDate);
    const endDate = new Date(saving.endDate);
    if (endDate.getTime() <= startDate.getTime()) {
        return 'Saving start date should be before end date.';
    }

    if (saving?.adjustments?.length > 0) {
        const adjusmentsResult = validateAdjustments(
            startDate,
            endDate,
            saving.adjustments
        );
        if (adjusmentsResult !== 'success') {
            return adjusmentsResult;
        }
    }
    if (saving?.oneTimePayments?.length > 0) {
        const oneTimePaymentsResult = validateOneTimePayments(
            startDate,
            endDate,
            saving.oneTimePayments
        );
        if (oneTimePaymentsResult !== 'success') {
            return oneTimePaymentsResult;
        }
    }
    return 'success';
};

export default validateSaving;
