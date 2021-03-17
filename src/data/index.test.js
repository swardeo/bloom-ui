import plot from './index';

describe('plot data', () => {
    const saving = {};
    const debt = {};

    beforeEach(() => {
        saving.name = 'Saving name';
        saving.startAmount = '50.00';
        saving.monthlyAmount = '0.00';
        saving.startDate = '2012-01';
        saving.endDate = '2016-06';
        saving.yearlyRate = '0.00';
        saving.adjustments = [];
        saving.oneTimePayments = [];

        debt.name = 'i am a debt ';
        debt.startAmount = '50.00';
        debt.startDate = '2012-01';
        debt.monthlyAmount = '0.00';
        debt.yearlyRate = '0.00';
        debt.adjustments = [];
        debt.oneTimePayments = [];
    });

    test('should contain two items', () => {
        const savings = [saving];
        const debts = [debt];

        const result = plot(savings, debts);

        expect(result).toHaveLength(2);
        expect(result[0].id).toEqual(`(S) ${saving.name}`);
        expect(result[1].id).toEqual(`(D) ${debt.name}`);
    });
});
