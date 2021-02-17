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

const plotSavings = (savings) => {
    if (savings.length === 0) {
        return [];
    }

    let plotted = [];

    savings.forEach((saving) => {
        let savingData = [];

        let currentAmount = new BigNumber(saving.startAmount);
        let currentDate = DateTime.fromISO(saving.startDate);
        let currentMonthlyAmount = new BigNumber(saving.monthlyAmount);
        let currentRate = new BigNumber(saving.yearlyRate);
        const endDate = DateTime.fromISO(saving.endDate);

        let adjustments =
            saving?.adjustments?.length > 0
                ? orderedAdjustments(saving.adjustments)
                : [];
        let oneTimePayments =
            saving?.oneTimePayments?.length > 0
                ? orderedOneTimePayments(saving.oneTimePayments)
                : [];

        savingData.push({
            x: formatDate(currentDate),
            y: formatNumber(currentAmount),
        });
        currentDate = addMonth(currentDate);

        while (currentDate <= endDate) {
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
            currentAmount = currentAmount.plus(currentMonthlyAmount);
            if (
                oneTimePayments.length > 0 &&
                currentDate.hasSame(oneTimePayments[0].date, 'day')
            ) {
                const oneTimeAmount = oneTimePayments.shift().amount;
                currentAmount = currentAmount.plus(oneTimeAmount);
            }

            savingData.push({
                x: formatDate(currentDate),
                y: formatNumber(currentAmount),
            });

            currentDate = addMonth(currentDate);
        }

        plotted.push({ id: saving.name, data: savingData });
    });

    return plotted;
};

export default plotSavings;
