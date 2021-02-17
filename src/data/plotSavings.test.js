import plotSavings from './plotSavings';

describe('plot saving data', () => {
    const saving = {};

    beforeEach(() => {
        saving.name = 'Saving name';
        saving.startAmount = '50.00';
        saving.monthlyAmount = '0.00';
        saving.startDate = '2012-01';
        saving.endDate = '2016-06';
        saving.yearlyRate = '0.00';
        saving.adjustments = [];
        saving.oneTimePayments = [];
    });

    test('should return empty array when no savings', () => {
        const savings = [];

        const result = plotSavings(savings);

        expect(result).toHaveLength(0);
    });

    test('should have id of saving name', () => {
        const savings = [saving];

        const result = plotSavings(savings);

        expect(result[0].id).toBe(savings[0].name);
    });

    test('should use startAmount and date', () => {
        const savings = [saving];

        const result = plotSavings(savings);

        const item = result[0].data[0];
        expect(item).toEqual({ x: '2012-01', y: '50.00' });
    });

    describe('should use rate', () => {
        test('when positive', () => {
            saving.endDate = '2012-02';
            saving.yearlyRate = '12.00';
            saving.monthlyAmount = '0.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '50.50' });
        });

        test('when negative', () => {
            saving.endDate = '2012-02';
            saving.yearlyRate = '-12.00';
            saving.monthlyAmount = '0.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '49.50' });
        });

        test('when compounded', () => {
            saving.endDate = '2012-03';
            saving.yearlyRate = '12.00';
            saving.monthlyAmount = '0.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.50' });
            expect(data[2]).toEqual({ x: '2012-03', y: '51.01' });
        });
    });

    describe('should use monthly amount', () => {
        test('when positive', () => {
            saving.endDate = '2012-02';
            saving.yearlyRate = '0.00';
            saving.monthlyAmount = '50.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '100.00' });
        });

        test('when negative', () => {
            saving.endDate = '2012-02';
            saving.yearlyRate = '0.00';
            saving.monthlyAmount = '-25.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const item = result[0].data[1];
            expect(item).toEqual({ x: '2012-02', y: '25.00' });
        });

        test('when compounded', () => {
            saving.endDate = '2012-03';
            saving.yearlyRate = '0.00';
            saving.monthlyAmount = '10.00';
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '60.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.00' });
        });
    });

    describe('should use one time payments', () => {
        test('when provided', () => {
            saving.endDate = '2012-03';
            saving.oneTimePayments = [{ amount: '20.00', date: '2012-03' }];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.00' });
        });

        test('when multiple provided', () => {
            saving.endDate = '2012-04';
            saving.oneTimePayments = [
                { amount: '20.00', date: '2012-03' },
                { amount: '40.00', date: '2012-04' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.00' });
            expect(data[3]).toEqual({ x: '2012-04', y: '110.00' });
        });

        test('when multiple provided unordered', () => {
            saving.endDate = '2012-04';
            saving.oneTimePayments = [
                { amount: '40.00', date: '2012-04' },
                { amount: '20.00', date: '2012-03' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.00' });
            expect(data[3]).toEqual({ x: '2012-04', y: '110.00' });
        });

        test('when negative provided', () => {
            saving.endDate = '2012-04';
            saving.oneTimePayments = [{ amount: '-20.00', date: '2012-03' }];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '30.00' });
        });
    });

    describe('should use one adjustments', () => {
        test('when provided', () => {
            saving.endDate = '2012-04';
            saving.adjustments = [
                { amount: '20.00', dateFrom: '2012-02', rate: '12.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '70.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '90.70' });
            expect(data[3]).toEqual({ x: '2012-04', y: '111.61' });
        });

        test('when multiple provided', () => {
            saving.endDate = '2012-04';
            saving.adjustments = [
                { amount: '0.00', dateFrom: '2012-02', rate: '12.00' },
                { amount: '20.00', dateFrom: '2012-03', rate: '0.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '70.50' });
            expect(data[3]).toEqual({ x: '2012-04', y: '90.50' });
        });

        test('when negative amount provided', () => {
            saving.endDate = '2012-03';
            saving.adjustments = [
                { amount: '-20.00', dateFrom: '2012-02', rate: '0.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '30.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '10.00' });
        });

        test('when negative rate provided', () => {
            saving.endDate = '2012-03';
            saving.adjustments = [
                { amount: '0.00', dateFrom: '2012-02', rate: '-12.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '50.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '49.50' });
        });

        test('when positive amount and negative rate provided', () => {
            saving.endDate = '2012-04';
            saving.adjustments = [
                { amount: '50.00', dateFrom: '2012-02', rate: '-12.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '100.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '149.00' });
            expect(data[3]).toEqual({ x: '2012-04', y: '197.51' });
        });

        test('when negative amount and positive rate provided', () => {
            saving.endDate = '2012-04';
            saving.adjustments = [
                { amount: '-10.00', dateFrom: '2012-02', rate: '12.00' },
            ];
            const savings = [saving];

            const result = plotSavings(savings);

            const data = result[0].data;
            expect(data[0]).toEqual({ x: '2012-01', y: '50.00' });
            expect(data[1]).toEqual({ x: '2012-02', y: '40.00' });
            expect(data[2]).toEqual({ x: '2012-03', y: '30.40' });
            expect(data[3]).toEqual({ x: '2012-04', y: '20.70' });
        });
    });

    test('should calculate multiple savings', () => {
        saving.monthlyAmount = '20.00';

        const saving2 = JSON.parse(JSON.stringify(saving));
        saving2.name = 'another saving name';
        saving2.startAmount = '100.00';
        saving2.startDate = '2013-06';
        saving2.monthlyAmount = '30.00';

        const savings = [saving, saving2];

        const result = plotSavings(savings);

        const result1 = result[0];
        expect(result1.id).toEqual(savings[0].name);
        expect(result1.data[0]).toEqual({ x: '2012-01', y: '50.00' });
        expect(result1.data[1]).toEqual({ x: '2012-02', y: '70.00' });
        expect(result1.data[2]).toEqual({ x: '2012-03', y: '90.00' });

        const result2 = result[1];
        expect(result2.id).toEqual(savings[1].name);
        expect(result2.data[0]).toEqual({ x: '2013-06', y: '100.00' });
        expect(result2.data[1]).toEqual({ x: '2013-07', y: '130.00' });
        expect(result2.data[2]).toEqual({ x: '2013-08', y: '160.00' });
    });
});
