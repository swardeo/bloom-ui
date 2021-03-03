const isEmpty = (str) => {
    return str.length === 0 || !str.trim();
};

const isGreaterThanZero = (str) => {
    return 0 < parseFloat(str);
};

const isInvalidDate = (str) => {
    const year = parseInt(str.split('-')[0]);
    const month = parseInt(str.split('-')[1]);
    return !(1969 < year && 2051 > year) || !(0 < month && 13 > month);
};

const validateAdjustments = (startDate, endDate, adjustments) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (adjustments.some((adjustment) => isInvalidDate(adjustment.dateFrom))) {
        return 'Date months should be between 01 and 12. Date years should be between 1970 and 2050.';
    }
    adjustments.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

    const firstAdjustment = new Date(adjustments[0].dateFrom);
    const lastAdjustment = new Date(
        adjustments[adjustments.length - 1].dateFrom
    );
    if (
        firstAdjustment.getTime() <= start.getTime() ||
        end.getTime() <= lastAdjustment.getTime()
    ) {
        return 'Adjustment date(s) should be between start and end date.';
    }
    return 'success';
};

const validateOneTimePayments = (startDate, endDate, oneTimePayments) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

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
        firstOneTimePayments.getTime() <= start.getTime() ||
        end.getTime() <= lastOneTimePayments.getTime()
    ) {
        return 'One Time Payment date(s) should be between start and end date.';
    }
    return 'success';
};

export {
    isEmpty,
    isInvalidDate,
    isGreaterThanZero,
    validateAdjustments,
    validateOneTimePayments,
};
