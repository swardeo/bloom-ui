import plot from './index';

describe('plot debt data', () => {
    const debt = {};

    beforeEach(() => {
        debt.name = 'i am a debt ';
        debt.startAmount = '50.00';
        debt.startDate = '2012-01';
        debt.monthlyAmount = '0.00';
        debt.yearlyRate = '0.00';
        debt.adjustments = [];
        debt.oneTimePayments = [];
    });

    test('should return empty array when no debts', () => {
        const debts = [];

        const result = plot([], debts);

        expect(result).toHaveLength(0);
    });

    test('should have id of debt name', () => {
        const debts = [debt];

        const result = plot([], debts);

        expect(result[0].id).toBe(`(D) ${debts[0].name}`);
    });

    test('should use startAmount and date', () => {
        const debts = [debt];

        const result = plot([], debts);

        const item = result[0].data[0];
        expect(item).toEqual({ x: '2012-01', y: '50.00' });
    });

    describe('should use rate', () => {
        test('when positive', () => {
            debt.yearlyRate = '12.00';
            debt.monthlyAmount = '0.00';
            const debts = [debt];

            const result = plot([], debts);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '50.50' });
        });

        test('when negative', () => {
            debt.yearlyRate = '-12.00';
            debt.monthlyAmount = '0.00';
            const debts = [debt];

            const result = plot([], debts);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '49.50' });
        });

        test('when compounded', () => {
            debt.yearlyRate = '-12.00';
            debt.monthlyAmount = '0.00';
            const debts = [debt];

            const result = plot([], debts);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '49.50' });
        });
    });

    describe('should use monthly amount', () => {
        test('when positive', () => {
            debt.yearlyRate = '0.00';
            debt.monthlyAmount = '10.00';
            const debts = [debt];

            const result = plot([], debts);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '40.00' });
        });

        test('when negative', () => {
            debt.yearlyRate = '0.00';
            debt.monthlyAmount = '-10.00';
            const debts = [debt];

            const result = plot([], debts);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '60.00' });
        });

        test('when compounded', () => {
            debt.yearlyRate = '0.00';
            debt.monthlyAmount = '10.00';
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '40.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '30.00' });
        });
    });

    describe('should use one time payments', () => {
        test('when provided', () => {
            debt.oneTimePayments = [{ amount: '20.00', date: '2012-03' }];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '30.00' });
        });

        test('when multiple provided', () => {
            debt.startAmount = '300.00';
            debt.oneTimePayments = [
                { amount: '20.00', date: '2012-03' },
                { amount: '40.00', date: '2012-04' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '300.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '300.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '280.00' });
            expect(data[3]).toEqual({ x: '2012-04', y: '240.00' });
        });

        test('when multiple provided unordered', () => {
            debt.startAmount = '300.00';
            debt.oneTimePayments = [
                { amount: '40.00', date: '2012-04' },
                { amount: '20.00', date: '2012-03' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '300.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '300.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '280.00' });
            expect(data[3]).toEqual({ x: '2012-04', y: '240.00' });
        });

        test('when negative provided', () => {
            debt.oneTimePayments = [{ amount: '-20.00', date: '2012-03' }];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.00' });
        });
    });

    describe('should use one adjustments', () => {
        test('when provided', () => {
            debt.startAmount = '100.00';
            debt.adjustments = [
                { amount: '20.00', dateFrom: '2012-02', rate: '12.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '100.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '80.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '60.80' });
            expect(data[3]).toEqual({ x: '2012-04', y: '41.41' });
        });

        test('when multiple provided', () => {
            debt.adjustments = [
                { amount: '0.00', dateFrom: '2012-02', rate: '12.00' },
                { amount: '20.00', dateFrom: '2012-03', rate: '0.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '30.50' });
            expect(data[3]).toEqual({ x: '2012-04', y: '10.50' });
        });

        test('when negative amount provided', () => {
            debt.adjustments = [
                { amount: '-20.00', dateFrom: '2012-02', rate: '0.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '70.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '90.00' });
        });

        test('when negative rate provided', () => {
            debt.adjustments = [
                { amount: '0.00', dateFrom: '2012-02', rate: '-12.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '49.50' });
        });

        test('when positive amount and negative rate provided', () => {
            debt.startAmount = '100.00';
            debt.adjustments = [
                { amount: '20.00', dateFrom: '2012-02', rate: '-12.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '100.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '80.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '59.20' });
            expect(data[3]).toEqual({ x: '2012-04', y: '38.61' });
        });

        test('when negative amount and positive rate provided', () => {
            debt.startAmount = '100.00';
            debt.adjustments = [
                { amount: '-20.00', dateFrom: '2012-02', rate: '12.00' },
            ];
            const debts = [debt];

            const result = plot([], debts);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '100.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '120.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '141.20' });
            expect(data[3]).toEqual({ x: '2012-04', y: '162.61' });
        });
    });

    test('should calculate multiple savings', () => {
        debt.monthlyAmount = '20.00';

        const debt2 = JSON.parse(JSON.stringify(debt));
        debt2.name = 'another debt name';
        debt2.startAmount = '100.00';
        debt2.startDate = '2013-06';
        debt2.monthlyAmount = '30.00';

        const debts = [debt, debt2];

        const result = plot([], debts);

        const result1 = result[0];
        expect(result1.id).toEqual(`(D) ${debts[0].name}`);
        expect(result1.data[0]).toEqual({ x: '2012-01', y: '50.00' });
        expect(result1.data[1]).toEqual({ x: '2012-02', y: '30.00' });
        expect(result1.data[2]).toEqual({ x: '2012-03', y: '10.00' });

        const result2 = result[1];
        expect(result2.id).toEqual(`(D) ${debts[1].name}`);
        expect(result2.data[0]).toEqual({ x: '2013-06', y: '100.00' });
        expect(result2.data[1]).toEqual({ x: '2013-07', y: '70.00' });
        expect(result2.data[2]).toEqual({ x: '2013-08', y: '40.00' });
    });

    test('should not let amount go below 0', () => {
        debt.monthlyAmount = '15.00';

        const debts = [debt];

        const result = plot([], debts);

        const data = result[0].data;
        expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
        expect(data[1]).toEqual({ x: '2012-02', y: '35.00' });
        expect(data[2]).toEqual({ x: '2012-03', y: '20.00' });
        expect(data[3]).toEqual({ x: '2012-04', y: '5.00' });
        expect(data[4]).toEqual({ x: '2012-05', y: '0.00' });
    });

    test('should not plot any month after amount being 0 reached', () => {
        debt.monthlyAmount = '15.00';

        const debts = [debt];

        const result = plot([], debts);

        const data = result[0].data;
        expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
        expect(data[1]).toEqual({ x: '2012-02', y: '35.00' });
        expect(data[2]).toEqual({ x: '2012-03', y: '20.00' });
        expect(data[3]).toEqual({ x: '2012-04', y: '5.00' });
        expect(data[4]).toEqual({ x: '2012-05', y: '0.00' });
        expect(data).toHaveLength(5);
    });

    test('should plot until 2050-12 if debt is not paid', () => {
        const debts = [debt];

        const result = plot([], debts);

        const data = result[0].data;
        expect(data).toContainEqual({ x: '2050-12', y: '50.00' });
    });
});
