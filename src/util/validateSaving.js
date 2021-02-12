const isEmpty = (str) => {
    return str.length === 0 || !str.trim();
};

const isNotGreaterThanZero = (str) => {
    return 0 >= parseFloat(str);
};

const isInvalidDate = (str) => {
    const year = parseInt(str.split('-')[0]);
    const month = parseInt(str.split('-')[1]);
    return !(1969 < year && 2051 > year) || !(0 < month && 13 > month);
};

const validateAdjustments = (startDate, endDate, adjustments) => {
    if (adjustments.some((adjustment) => isInvalidDate(adjustment.dateFrom))) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }
    adjustments.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

    const firstAdjustment = new Date(adjustments[0].dateFrom);
    const lastAdjustment = new Date(
        adjustments[adjustments.length - 1].dateFrom
    );
    if (
        firstAdjustment.getTime() <= startDate.getTime() ||
        endDate.getTime() <= lastAdjustment.getTime()
    ) {
        return 'Adjustment date(s) should be between start and end date.';
    }
    return 'success';
};

const validateOneTimePayments = (startDate, endDate, oneTimePayments) => {
    if (
        oneTimePayments.some((oneTimePayment) =>
            isInvalidDate(oneTimePayment.date)
        )
    ) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }
    oneTimePayments.sort((a, b) => new Date(a.date) - new Date(b.date));

    const firstOneTimePayments = new Date(oneTimePayments[0].date);
    const lastOneTimePayments = new Date(
        oneTimePayments[oneTimePayments.length - 1].date
    );
    if (
        firstOneTimePayments.getTime() <= startDate.getTime() ||
        endDate.getTime() <= lastOneTimePayments.getTime()
    ) {
        return 'One Time Payment date(s) should be between start and end date.';
    }
    return 'success';
};

const validateSaving = (saving) => {
    if (isEmpty(saving.name)) {
        return 'Saving name should not be blank.';
    }
    if (isNotGreaterThanZero(saving.startAmount)) {
        return 'Saving start amount should be greater than £0.00.';
    }
    if (isInvalidDate(saving.startDate) || isInvalidDate(saving.endDate)) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }

    const startDate = new Date(saving.startDate);
    const endDate = new Date(saving.endDate);
    if (endDate.getTime() < startDate.getTime()) {
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
