import validateSaving from './validateSaving';

describe('validate saving', () => {
    const saving = {};

    beforeEach(() => {
        saving.name = 'Saving name';
        saving.startAmount = '1.11';
        saving.startDate = '2012-11';
        saving.endDate = '2016-06';
        saving.yearlyRate = '1.50';
        saving.adjustments = [
            { amount: '20.00', dateFrom: '2012-12', rate: '0.10' },
        ];
        saving.oneTimePayments = [{ amount: '20.00', date: '2016-05' }];
    });

    test('should return success when valid saving', () => {
        const result = validateSaving(saving);
        expect(result).toBe('success');
    });

    test('should return error message when name blank', () => {
        saving.name = '   ';
        const result = validateSaving(saving);
        expect(result).toBe('Saving name should not be blank.');
    });

    test('should return error message when start amount is 0', () => {
        saving.startAmount = '0.00';
        const result = validateSaving(saving);
        expect(result).toBe(
            'Saving start amount should be greater than £0.00.'
        );
    });

    test('should return error message when start date after end date', () => {
        saving.endDate = '2012-10';
        const result = validateSaving(saving);
        expect(result).toBe('Saving start date should be before end date.');
    });

    test.each`
        date
        ${'1969-12'}
        ${'2012-00'}
        ${'2012-13'}
        ${'2051-01'}
    `('should return error message when start date is invalid', ({ date }) => {
        saving.startDate = date;
        const result = validateSaving(saving);
        expect(result).toBe(
            'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
        );
    });

    test.each`
        date
        ${'1969-12'}
        ${'2012-00'}
        ${'2012-13'}
        ${'2051-01'}
    `('should return error message when end date is invalid', ({ date }) => {
        saving.endDate = date;
        const result = validateSaving(saving);
        expect(result).toBe(
            'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
        );
    });

    test.each`
        date
        ${'1969-12'}
        ${'2012-00'}
        ${'2012-13'}
        ${'2051-01'}
    `(
        'should return error message when adjustment date is invalid',
        ({ date }) => {
            saving.adjustments = [
                { amount: '20.00', dateFrom: date, rate: '0.10' },
            ];
            const result = validateSaving(saving);
            expect(result).toBe(
                'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
            );
        }
    );

    test.each`
        date
        ${'2012-11'}
        ${'2012-10'}
        ${'2016-06'}
        ${'2016-07'}
    `(
        'should return error message when adjustment date is outside start and end date',
        ({ date }) => {
            saving.adjustments = [
                { amount: '20.00', dateFrom: date, rate: '0.10' },
            ];
            const result = validateSaving(saving);
            expect(result).toBe(
                'Adjustment date(s) should be between start and end date.'
            );
        }
    );

    test('should return error message when adjustments contains date outside start and end date', () => {
        saving.adjustments = [
            { amount: '20.00', dateFrom: '2015-07', rate: '0.10' },
            { amount: '20.00', dateFrom: '2010-01', rate: '0.10' },
            { amount: '20.00', dateFrom: '2014-12', rate: '0.10' },
        ];
        const result = validateSaving(saving);
        expect(result).toBe(
            'Adjustment date(s) should be between start and end date.'
        );
    });

    test.each`
        date
        ${'1969-12'}
        ${'2012-00'}
        ${'2012-13'}
        ${'2051-01'}
    `(
        'should return error message when oneTimePayment date is invalid',
        ({ date }) => {
            saving.oneTimePayments = [{ amount: '20.00', date: date }];
            const result = validateSaving(saving);
            expect(result).toBe(
                'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
            );
        }
    );

    test.each`
        date
        ${'2012-11'}
        ${'2012-10'}
        ${'2016-06'}
        ${'2016-07'}
    `(
        'should return error message when oneTimePayment date is outside start and end date',
        ({ date }) => {
            saving.oneTimePayments = [{ amount: '20.00', date: date }];
            const result = validateSaving(saving);
            expect(result).toBe(
                'One Time Payment date(s) should be between start and end date.'
            );
        }
    );

    test('should return error message when oneTimePayments contains date outside start and end date', () => {
        saving.oneTimePayments = [
            { amount: '20.00', date: '2015-07' },
            { amount: '20.00', date: '2010-01' },
            { amount: '20.00', date: '2014-12' },
        ];
        const result = validateSaving(saving);
        expect(result).toBe(
            'One Time Payment date(s) should be between start and end date.'
        );
    });

    test('should return success when no adjustments', () => {
        delete saving.adjustments;
        const result = validateSaving(saving);
        expect(result).toBe('success');
    });

    test('should return success when no one time payments', () => {
        delete saving.oneTimePayments;
        const result = validateSaving(saving);
        expect(result).toBe('success');
    });
});
