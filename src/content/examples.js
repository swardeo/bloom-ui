import { Typography, Link } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import plot from '../data';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
}));

const examples = new Map();
examples.set('savings', [
    {
        title: 'The basics of a saving in Bloom',
        description: (
            <div>
                <Typography paragraph>
                    This example shows a saving, named House Deposit, which
                    begins in January 2015 and exists until December 2020. We
                    will continue with this example as we explore savings in
                    Bloom.
                </Typography>
                <Typography paragraph>
                    The saving has an amount of £0.00 when first created, then
                    in each following month £100.00 is added to the total. This
                    continues until the end date is reached.
                </Typography>
                <Typography paragraph>
                    The value of the saving is displayed on the y-axis, while
                    the date is displayed on the x-axis.
                </Typography>
                <Typography gutterBottom>
                    Try hovering over the graph with your cursor, it will
                    display a tooltip showing the value of the saving in that
                    particular month.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-12',
                    yearlyRate: '0.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ],
            []
        ),
    },
    {
        title: 'Further basics of a saving',
        description: (
            <div>
                <Typography paragraph>
                    It is also possible to apply a yearly rate to a saving, for
                    example this could be the associated interest rate.
                </Typography>
                <Typography paragraph>
                    In Bloom, the yearly rate will be applied each month and
                    continue to compound throughout the year.
                </Typography>
                <Typography paragraph>
                    The below example shows a saving with a 12.00% yearly rate.
                    This results in 1.00% being applied each month to the total
                    of the previous month.
                </Typography>
                <Typography gutterBottom>
                    The shape of the plotted line on the graph reflects this,
                    forming a slight curve upwards.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-12',
                    yearlyRate: '12.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ],
            []
        ),
    },
    {
        title: 'What about a change in situation?',
        description: (
            <div>
                <Typography paragraph>
                    Changes in situation are often unavoidable in life, so Bloom
                    tries to be flexible to accommodate this.
                </Typography>
                <Typography paragraph>
                    This is achieved using adjustments. An adjustment can be
                    used to change both the monthly amount and yearly rate
                    values applied to the saving.
                </Typography>
                <Typography paragraph>
                    For example, in January 2017, we can change the monthly
                    amount to £50.00 and the yearly rate to 6.00%.
                </Typography>
                <Typography paragraph>
                    The new monthly amount will be used in the month provided,
                    while the new yearly rate will begin to be used in the
                    following month.
                </Typography>
                <Typography gutterBottom>
                    Due to reducing both the monthly amount and yearly rate, we
                    can now observe that the line flattens slightly after these
                    changes occur in January 2017.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-12',
                    yearlyRate: '12.00',
                    adjustments: [
                        {
                            amount: '50.00',
                            dateFrom: '2017-01',
                            rate: '6.00',
                        },
                    ],
                    oneTimePayments: [],
                },
            ],
            []
        ),
    },
    {
        title: 'What about one-off events?',
        description: (
            <div>
                <Typography paragraph>
                    It would be quite cumbersome to have to use adjustments to
                    change the monthly amount for a single month.
                </Typography>
                <Typography paragraph>
                    As such, one-time payments can be used to apply a one-off
                    payment. This is applied in addition to any other monthly
                    amount and interest in that month.
                </Typography>
                <Typography paragraph>
                    For example, in January 2018, we can provide a one-time
                    payment of £500.00.
                </Typography>
                <Typography gutterBottom>
                    This can be clearly observed in the graph, and the following
                    month continues with the previous trajectory.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-12',
                    yearlyRate: '12.00',
                    adjustments: [
                        {
                            amount: '50.00',
                            dateFrom: '2017-01',
                            rate: '6.00',
                        },
                    ],
                    oneTimePayments: [
                        {
                            amount: '500.00',
                            date: '2018-01',
                        },
                    ],
                },
            ],
            []
        ),
    },
    {
        title: 'Is it that simple?',
        description: (
            <div>
                <Typography paragraph>
                    Indeed. Though the different concepts can be used to build
                    quite complex savings.
                </Typography>
                <Typography paragraph>
                    There is no limit to how many months adjustments and
                    one-time payments can be applied in. Christmas bonus, change
                    of job? Bloom can handle all of this!
                </Typography>
                <Typography gutterBottom>
                    If you're interested in exploring some more complex examples
                    involving savings, take a look at the Complex tab. Or, if
                    you are interested in finding out about debts in Bloom, take
                    a look at the Debts tab - though they're pretty similar to
                    savings.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-12',
                    yearlyRate: '12.00',
                    adjustments: [
                        {
                            amount: '50.00',
                            dateFrom: '2017-01',
                            rate: '6.00',
                        },
                    ],
                    oneTimePayments: [
                        {
                            amount: '500.00',
                            date: '2018-01',
                        },
                    ],
                },
            ],
            []
        ),
    },
]);

examples.set('debts', [
    {
        title: 'The basics of a debt in Bloom',
        description: (
            <div>
                <Typography paragraph>
                    This example shows a debt, named Car Loan, which begins in
                    January 2015 with a value of £10,000.00. We will continue
                    with this example as we explore debts in Bloom.
                </Typography>
                <Typography paragraph>
                    To begin with, £200.00 is paid towards the debt each month.
                    This will continue until the month in which the value
                    reaches £0.00 or until December 2050 if £0.00 is never
                    reached.
                </Typography>
                <Typography gutterBottom>
                    As before, the value of the saving is displayed on the
                    y-axis, while the date is displayed on the x-axis. And
                    again, you can hover over the graph to view a tooltip for
                    the given month.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '0.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ]
        ),
    },
    {
        title: 'Further basics of a debt',
        description: (
            <div>
                <Typography paragraph>
                    It is also possible to apply a yearly rate to a debt, for
                    example this could be the associated interest rate.
                </Typography>
                <Typography paragraph>
                    In Bloom, the yearly rate will be applied each month and
                    continue to compound throughout the year.
                </Typography>
                <Typography paragraph>
                    The below example shows a debt with a 3.00% yearly rate.
                    This would mean that 0.25% of the total is applied each
                    month to the total of the previous month.
                </Typography>
                <Typography gutterBottom>
                    If you look closely, you will be able to see that as a
                    result it takes longer for the debt to reach £0.00 than
                    before.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ]
        ),
    },
    {
        title: 'What about a change in situation?',
        description: (
            <div>
                <Typography paragraph>
                    Changes in situation are often unavoidable in life, so Bloom
                    tries to be flexible to accommodate this.
                </Typography>
                <Typography paragraph>
                    This is achieved using adjustments. An adjustment can be
                    used to change both the monthly amount and yearly rate
                    values applied to the debt.
                </Typography>
                <Typography paragraph>
                    For example, in January 2017, we can increase the monthly
                    amount to £300.00 but leave the yearly rate at 3.00%.
                </Typography>
                <Typography paragraph>
                    The new monthly amount will be used in the month provided,
                    while the yearly rate will be applied in the same way as
                    before.
                </Typography>
                <Typography gutterBottom>
                    Due to increase in monthly payments against the debt, we can
                    observe that the line steepens after January 2017 when this
                    adjustment takes place.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [
                        {
                            amount: '300.00',
                            dateFrom: '2017-01',
                            rate: '3.00',
                        },
                    ],
                    oneTimePayments: [],
                },
            ]
        ),
    },
    {
        title: 'What about one-off events?',
        description: (
            <div>
                <Typography paragraph>
                    It would be quite cumbersome to have to use adjustments to
                    change the monthly amount for a single month.
                </Typography>
                <Typography paragraph>
                    As such, one-time payments can be used to apply a one-off
                    payment. This is applied in addition to any other monthly
                    amount or interest in that month.
                </Typography>
                <Typography paragraph>
                    For example, in January 2018, we can provide a one-time
                    payment of £500.00.
                </Typography>
                <Typography gutterBottom>
                    This can be clearly observed in the graph, and the following
                    month continues with the previous trajectory.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [
                        {
                            amount: '300.00',
                            dateFrom: '2017-01',
                            rate: '3.00',
                        },
                    ],
                    oneTimePayments: [
                        {
                            amount: '500.00',
                            date: '2018-01',
                        },
                    ],
                },
            ]
        ),
    },
    {
        title: 'Is it that simple?',
        description: (
            <div>
                <Typography paragraph>
                    Indeed. Though the different concepts can be used to build
                    quite complex debts.
                </Typography>
                <Typography paragraph>
                    As you can see, debts are extremely similar to savings in
                    Bloom - except the hope is that they are moving towards
                    £0.00 rather than away.
                </Typography>
                <Typography paragraph>
                    There is no limit to how many months adjustments and
                    one-time payments can be applied in. Christmas bonus, change
                    of job? Bloom can handle all of this!
                </Typography>
                <Typography gutterBottom>
                    If you're interested in exploring some more complex examples
                    involving debts, take a look at the Complex tab.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [
                        {
                            amount: '300.00',
                            dateFrom: '2017-01',
                            rate: '3.00',
                        },
                    ],
                    oneTimePayments: [
                        {
                            amount: '500.00',
                            date: '2018-01',
                        },
                    ],
                },
            ]
        ),
    },
]);

examples.set('complex', [
    {
        title: 'What else is there to know?',
        description: (
            <div>
                <Typography paragraph>
                    After exploring the basics of savings and debts in Bloom,
                    you probably know enough to have a try for yourself.
                    However, if you're wanting to learn more or find some
                    inspiration, you can take a look into some more complex
                    examples.
                </Typography>
                <Typography paragraph>
                    One way of using Bloom could be in decision making. Often it
                    can be difficult to understand what difference would
                    actually be made when deciding how much to pay towards
                    different debts or savings each month.
                </Typography>
                <Typography paragraph>
                    For example, we could plot a Car Loan debt twice using
                    different values to see the difference between different
                    decisions.
                </Typography>
                <Typography paragraph>
                    Both begin at £10,000.00 with a yearly rate of 3.00%. Car
                    Loan 1 pays £200.00 each month, whereas Car Loan 2 pays
                    £300.00 each month.
                </Typography>
                <Typography gutterBottom>
                    Do the plotted lines show what you expect? Is the certainty
                    you get from paying off the debt earlier worth the extra
                    £100.00 spent each month? Bloom doesn't provide the answers
                    to these questions, but the information that can help
                    support decisions such as these.
                </Typography>
            </div>
        ),
        data: plot(
            [],
            [
                {
                    name: 'Car Loan 1',
                    startAmount: '10000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
                {
                    name: 'Car Loan 2',
                    startAmount: '10000.00',
                    monthlyAmount: '300.00',
                    startDate: '2015-01',
                    yearlyRate: '3.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ]
        ),
    },
    {
        title: 'Endless possibilities',
        description: (
            <div>
                <Typography paragraph>
                    Bloom could be used explore the outcome of different
                    possibilities before they happen.
                </Typography>
                <Typography paragraph>
                    We can use pensions as an example, as we have little control
                    over the rate of return these earn on a yearly basis.
                </Typography>
                <Typography paragraph>
                    If between January 2010 and December 2040 £100.00 was added
                    to a pension each month, we can find the total accumulated
                    value reached when using different average yearly rates of
                    return. Pension 1, 2 and 3 have been plotted to show this
                    using an average yearly rate of 4.00%, 5.00% and 6.00%
                    respectively.
                </Typography>
                <Typography paragraph>
                    The point of finding this information is not to try and
                    predict the actual final value reached (as that would be
                    close to impossible to do). Rather, to show a range of some
                    of the possible outcomes and check that they would be
                    considered acceptable in your personal situation. For
                    instance, if you would not be happy if Pension 1 became
                    reality, you could make a change such as increasing pension
                    contributions, so that this outcome would then fall within
                    the range of outcomes you are happy with.
                </Typography>
                <Typography gutterBottom>
                    While this was only a basic example, you could include far
                    more detail in your calculations. Factors such as future
                    changes in salary, any possible one-off bonuses, etc., could
                    be considered.
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'Pension 1',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2010-01',
                    endDate: '2040-12',
                    yearlyRate: '4.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
                {
                    name: 'Pension 2',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2010-01',
                    endDate: '2040-12',
                    yearlyRate: '5.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
                {
                    name: 'Pension 3',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2010-01',
                    endDate: '2040-12',
                    yearlyRate: '6.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
            ],
            []
        ),
    },
    {
        title: 'Over to you',
        description: (
            <div>
                <Typography paragraph>
                    We've by no means covered everything that you could achieve
                    when using Bloom. This was a quick tour to show most of the
                    basic operations and some possible scenarios, but it can be
                    used in many different ways to cover other scenarios.
                </Typography>
                <Typography gutterBottom>
                    Have any feedback or questions?{' '}
                    <StyledLink
                        key="about page"
                        component={RouterLink}
                        to={'/about'}
                        target="_blank"
                    >
                        Feel free to get in touch!
                    </StyledLink>
                </Typography>
            </div>
        ),
        data: plot(
            [
                {
                    name: 'Emergency Fund',
                    startAmount: '4000.00',
                    monthlyAmount: '0.00',
                    startDate: '2011-11',
                    endDate: '2020-10',
                    yearlyRate: '1.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
                {
                    name: 'House Deposit',
                    startAmount: '0.00',
                    monthlyAmount: '100.00',
                    startDate: '2015-01',
                    endDate: '2020-10',
                    yearlyRate: '0.30',
                    adjustments: [
                        {
                            amount: '75.00',
                            dateFrom: '2017-01',
                            rate: '0.40',
                        },
                    ],
                    oneTimePayments: [],
                },
                {
                    name: 'Wedding',
                    startAmount: '0.00',
                    monthlyAmount: '150.00',
                    startDate: '2014-05',
                    endDate: '2017-07',
                    yearlyRate: '0.20',
                    adjustments: [],
                    oneTimePayments: [
                        {
                            amount: '400.00',
                            date: '2015-11',
                        },
                    ],
                },
            ],
            [
                {
                    name: 'Car Loan',
                    startAmount: '5000.00',
                    monthlyAmount: '200.00',
                    startDate: '2015-02',
                    yearlyRate: '3.00',
                    adjustments: [],
                    oneTimePayments: [],
                },
                {
                    name: 'Holiday',
                    startAmount: '2000.00',
                    monthlyAmount: '100.00',
                    startDate: '2011-11',
                    yearlyRate: '3.00',
                    adjustments: [
                        {
                            amount: '500.00',
                            dateFrom: '2012-02',
                            rate: '1.50',
                        },
                    ],
                    oneTimePayments: [],
                },
            ]
        ),
    },
]);

export default examples;
