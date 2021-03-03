import validateDebt from './validateDebt';

describe('validate debt', () => {
    const debt = {};

    beforeEach(() => {
        debt.name = 'Debt';
        debt.startAmount = '1.11';
        debt.startDate = '2012-11';
        debt.yearlyRate = '1.50';
        debt.adjustments = [
            { amount: '20.00', dateFrom: '2013-12', rate: '0.10' },
        ];
        debt.oneTimePayments = [{ amount: '20.00', date: '2016-05' }];
    });

    test('should return success when valid debt', () => {
        const result = validateDebt(debt);
        expect(result).toBe('success');
    });

    test('should return error message when name blank', () => {
        debt.name = '   ';
        const result = validateDebt(debt);
        expect(result).toBe('Debt name should not be blank.');
    });

    test('should return error message when start amount is not greater than zero', () => {
        debt.startAmount = '0.00';
        const result = validateDebt(debt);
        expect(result).toBe('Debt start amount should be greater than £0.00.');
    });

    test.each`
        date
        ${'1969-12'}
        ${'2012-00'}
        ${'2012-13'}
        ${'2051-01'}
    `('should return error message when start date is invalid', ({ date }) => {
        debt.startDate = date;
        const result = validateDebt(debt);
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
            debt.adjustments = [
                { amount: '20.00', dateFrom: date, rate: '0.10' },
            ];
            const result = validateDebt(debt);
            expect(result).toBe(
                'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
            );
        }
    );

    test.each`
        date
        ${'2012-09'}
        ${'2012-10'}
    `(
        'should return error message when adjustment date is outside start and end date',
        ({ date }) => {
            debt.adjustments = [
                { amount: '20.00', dateFrom: date, rate: '0.10' },
            ];
            const result = validateDebt(debt);
            expect(result).toBe(
                'Adjustment date(s) should be between start and end date.'
            );
        }
    );

    test('should return error message when adjustments contains date outside start and end date', () => {
        debt.adjustments = [
            { amount: '20.00', dateFrom: '2015-07', rate: '0.10' },
            { amount: '20.00', dateFrom: '2012-10', rate: '0.10' },
            { amount: '20.00', dateFrom: '2014-12', rate: '0.10' },
        ];
        const result = validateDebt(debt);
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
            debt.oneTimePayments = [{ amount: '20.00', date: date }];
            const result = validateDebt(debt);
            expect(result).toBe(
                'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
            );
        }
    );

    test.each`
        date
        ${'2012-09'}
        ${'2012-10'}
    `(
        'should return error message when oneTimePayment date is outside start and end date',
        ({ date }) => {
            debt.oneTimePayments = [{ amount: '20.00', date: date }];
            const result = validateDebt(debt);
            expect(result).toBe(
                'One Time Payment date(s) should be between start and end date.'
            );
        }
    );

    test('should return error message when oneTimePayments contains date outside start and end date', () => {
        debt.oneTimePayments = [
            { amount: '20.00', date: '2015-07' },
            { amount: '20.00', date: '2012-10' },
            { amount: '20.00', date: '2014-12' },
        ];
        const result = validateDebt(debt);
        expect(result).toBe(
            'One Time Payment date(s) should be between start and end date.'
        );
    });

    test('should return success when no adjustments', () => {
        delete debt.adjustments;
        const result = validateDebt(debt);
        expect(result).toBe('success');
    });

    test('should return success when no oneTimePayments', () => {
        delete debt.oneTimePayments;
        const result = validateDebt(debt);
        expect(result).toBe('success');
    });
});
