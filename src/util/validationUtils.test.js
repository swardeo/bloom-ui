import {
    isEmpty,
    isInvalidDate,
    isGreaterThanZero,
    isNegative,
    validateAdjustments,
    validateOneTimePayments,
} from './validationUtils';

describe('validation utils', () => {
    describe('isEmpty', () => {
        test.each`
            string
            ${''}
            ${' '}
            ${'   '}
            ${'\n'}
        `('should return true when empty', ({ string }) => {
            const result = isEmpty(string);
            expect(result).toBe(true);
        });

        test.each`
            string
            ${'am string'}
            ${'hello'}
            ${'i'}
        `('should return false when not empty', ({ string }) => {
            const result = isEmpty(string);
            expect(result).toBe(false);
        });
    });

    describe('isInvalidDate', () => {
        test.each`
            date
            ${'1969-12'}
            ${'2012-00'}
            ${'2012-13'}
            ${'2051-01'}
        `('should return true when date is invalid', ({ date }) => {
            const result = isInvalidDate(date);
            expect(result).toBe(true);
        });

        test.each`
            date
            ${'1970-01'}
            ${'1970-02'}
            ${'2012-06'}
            ${'2050-11'}
            ${'2050-12'}
        `('should return false when date is valid', ({ date }) => {
            const result = isInvalidDate(date);
            expect(result).toBe(false);
        });
    });

    describe('isGreaterThanZero', () => {
        test.each`
            value
            ${'0.01'}
            ${'0.02'}
            ${'1.00'}
            ${'1521.26'}
        `('should return true when greater than zero', ({ value }) => {
            const result = isGreaterThanZero(value);
            expect(result).toBe(true);
        });

        test.each`
            value
            ${'0.00'}
            ${'-0.01'}
            ${'-1.00'}
            ${'-1521.26'}
        `('should return false when not greater than zero', ({ value }) => {
            const result = isGreaterThanZero(value);
            expect(result).toBe(false);
        });
    });

    describe('isNegative', () => {
        test.each`
            value
            ${'0.00'}
            ${'0.01'}
            ${'1.00'}
            ${'1521.26'}
        `('should return false when greater than zero', ({ value }) => {
            const result = isNegative(value);
            expect(result).toBe(false);
        });

        test.each`
            value
            ${'-0.01'}
            ${'-0.02'}
            ${'-1.00'}
            ${'-1521.26'}
        `('should return true when negative', ({ value }) => {
            const result = isNegative(value);
            expect(result).toBe(true);
        });
    });

    describe('validateAdjustments', () => {
        test.each`
            date
            ${'1969-12'}
            ${'2012-00'}
            ${'2012-13'}
            ${'2051-01'}
        `(
            'should return error message when adjustment date is invalid',
            ({ date }) => {
                const adjustments = [
                    { monthlyAmount: '150.00', dateFrom: date, rate: '2.00' },
                ];
                const startDate = '2000-01';
                const endDate = '2012-01';

                const result = validateAdjustments(
                    startDate,
                    endDate,
                    adjustments
                );
                expect(result).toBe(
                    'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
                );
            }
        );

        test.each`
            date
            ${'1999-11'}
            ${'1999-12'}
            ${'2012-02'}
            ${'2012-03'}
        `(
            'should return error message when adjustment date is outside start and end date',
            ({ date }) => {
                const adjustments = [
                    { monthlyAmount: '150.00', dateFrom: date, rate: '2.00' },
                ];
                const startDate = '2000-01';
                const endDate = '2012-01';

                const result = validateAdjustments(
                    startDate,
                    endDate,
                    adjustments
                );
                expect(result).toBe(
                    'Adjustment date(s) should be between start and end date.'
                );
            }
        );

        test('should return error message when adjustments contains date outside start and end date', () => {
            const adjustments = [
                { amount: '20.00', dateFrom: '2008-07', rate: '0.10' },
                { amount: '20.00', dateFrom: '1999-06', rate: '0.10' },
                { amount: '20.00', dateFrom: '2011-12', rate: '0.10' },
            ];
            const startDate = '2000-01';
            const endDate = '2012-01';

            const result = validateAdjustments(startDate, endDate, adjustments);
            expect(result).toBe(
                'Adjustment date(s) should be between start and end date.'
            );
        });
    });

    describe('validateOneTimePayments', () => {
        test.each`
            date
            ${'1969-12'}
            ${'2012-00'}
            ${'2012-13'}
            ${'2051-01'}
        `(
            'should return error message when oneTimePayment date is invalid',
            ({ date }) => {
                const oneTimePayments = [{ amount: '150.00', date: date }];
                const startDate = '2000-01';
                const endDate = '2012-01';

                const result = validateOneTimePayments(
                    startDate,
                    endDate,
                    oneTimePayments
                );
                expect(result).toBe(
                    'Date months should be between 01 and 12. Date years should be between 1970 and 2050.'
                );
            }
        );

        test.each`
            date
            ${'1999-11'}
            ${'1999-12'}
            ${'2012-02'}
            ${'2012-03'}
        `(
            'should return error message when oneTimePayment date is outside start and end date',
            ({ date }) => {
                const oneTimePayments = [{ amount: '150.00', date: date }];
                const startDate = '2000-01';
                const endDate = '2012-01';

                const result = validateOneTimePayments(
                    startDate,
                    endDate,
                    oneTimePayments
                );
                expect(result).toBe(
                    'One Time Payment date(s) should be between start and end date.'
                );
            }
        );

        test('should return error message when oneTimePayments contains date outside start and end date', () => {
            const oneTimePayments = [
                { amount: '20.00', date: '2008-07' },
                { amount: '20.00', date: '1999-06' },
                { amount: '20.00', date: '2011-12' },
            ];
            const startDate = '2000-01';
            const endDate = '2012-01';

            const result = validateOneTimePayments(
                startDate,
                endDate,
                oneTimePayments
            );
            expect(result).toBe(
                'One Time Payment date(s) should be between start and end date.'
            );
        });
    });
});
