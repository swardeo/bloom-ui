import {
    isEmpty,
    isInvalidDate,
    isGreaterThanZero,
    validateAdjustments,
    validateOneTimePayments,
} from './validationUtils';

const validateDebt = (debt) => {
    if (isEmpty(debt.name)) {
        return 'Debt name should not be blank.';
    }
    if (!isGreaterThanZero(debt.startAmount)) {
        return 'Debt start amount should be greater than £0.00.';
    }
    if (isInvalidDate(debt.startDate)) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }
    if (debt?.adjustments?.length > 0) {
        const result = validateAdjustments(
            debt.startDate,
            '2050-12',
            debt.adjustments
        );
        if ('success' !== result) {
            return result;
        }
    }
    if (debt?.oneTimePayments?.length > 0) {
        const result = validateOneTimePayments(
            debt.startDate,
            '2050-12',
            debt.oneTimePayments
        );
        if ('success' !== result) {
            return result;
        }
    }
    return 'success';
};

export default validateDebt;
