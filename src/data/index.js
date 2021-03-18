import { BigNumber } from 'bignumber.js';
import { DateTime } from 'luxon';

const formatDate = (date) => {
    return `${date.toFormat('y')}-${date.toFormat('MM')}`;
};

const formatNumber = (number) => {
    return number.toFixed(2);
};

const addMonth = (date) => {
    return date.plus({ months: 1 });
};

const calculateMonthlyInterest = (amount, rate) => {
    const yearly = rate.div(100);
    const monthly = yearly.div(12);
    const interest = amount.multipliedBy(monthly);
    return interest;
};

const orderedOneTimePayments = (oneTimePayments) => {
    const mappedOneTimePayments = oneTimePayments.map((oneTimePayment) => ({
        date: DateTime.fromISO(oneTimePayment.date),
        amount: new BigNumber(oneTimePayment.amount),
    }));
    return mappedOneTimePayments.sort(
        (a, b) => a.date.toMillis() - b.date.toMillis()
    );
};

const orderedAdjustments = (adjustments) => {
    const mappedAdjustments = adjustments.map((adjustment) => ({
        amount: new BigNumber(adjustment.amount),
        dateFrom: DateTime.fromISO(adjustment.dateFrom),
        rate: new BigNumber(adjustment.rate),
    }));
    return mappedAdjustments.sort(
        (a, b) => a.dateFrom.toMillis() - b.dateFrom.toMillis()
    );
};

const Type = {
    SAVING: 'saving',
    DEBT: 'debt',
};

const calculate = (inputs, type) => {
    if (inputs.length === 0) {
        return [];
    }

    let plotted = [];

    inputs.forEach((input) => {
        let plottedData = [];

        let currentAmount = new BigNumber(input.startAmount);
        let currentDate = DateTime.fromISO(input.startDate);
        let currentMonthlyAmount = new BigNumber(input.monthlyAmount);
        let currentRate = new BigNumber(input.yearlyRate);
        const endDate =
            type === Type.SAVING
                ? DateTime.fromISO(input.endDate)
                : DateTime.fromISO('2050-12');

        let adjustments =
            input?.adjustments?.length > 0
                ? orderedAdjustments(input.adjustments)
                : [];
        let oneTimePayments =
            input?.oneTimePayments?.length > 0
                ? orderedOneTimePayments(input.oneTimePayments)
                : [];

        plottedData.push({
            x: formatDate(currentDate),
            y: formatNumber(currentAmount),
        });
        currentDate = addMonth(currentDate);

        while (
            currentDate <= endDate &&
            (type === Type.DEBT ? currentAmount.gt(BigNumber(0)) : true)
        ) {
            currentAmount = currentAmount.plus(
                calculateMonthlyInterest(currentAmount, currentRate)
            );

            if (
                adjustments.length > 0 &&
                currentDate.hasSame(adjustments[0].dateFrom, 'day')
            ) {
                const adjustment = adjustments.shift();
                currentMonthlyAmount = adjustment.amount;
                currentRate = adjustment.rate;
            }

            currentAmount =
                type === Type.SAVING
                    ? currentAmount.plus(currentMonthlyAmount)
                    : currentAmount.minus(currentMonthlyAmount);

            if (
                oneTimePayments.length > 0 &&
                currentDate.hasSame(oneTimePayments[0].date, 'day')
            ) {
                const oneTimeAmount = oneTimePayments.shift().amount;
                currentAmount =
                    type === Type.SAVING
                        ? currentAmount.plus(oneTimeAmount)
                        : currentAmount.minus(oneTimeAmount);
            }

            if (type === Type.DEBT) {
                currentAmount = currentAmount.gt(BigNumber(0))
                    ? currentAmount
                    : BigNumber(0);
            }

            plottedData.push({
                x: formatDate(currentDate),
                y: formatNumber(currentAmount),
            });

            currentDate = addMonth(currentDate);
        }

        plotted.push({
            id: `(${type === Type.SAVING ? 'S' : 'D'}) ${input.name}`,
            data: plottedData,
        });
    });

    return plotted;
};

const plot = (savings, debts) => {
    return calculate(savings, Type.SAVING).concat(calculate(debts, Type.DEBT));
};

export default plot;
