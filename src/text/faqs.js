import { Typography, Link } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
}));

const faqs = [
    {
        id: 'savings-in-bloom',
        title: 'What is a saving in Bloom and how does it work?',
        content: (
            <div>
                <Typography paragraph>
                    A saving in Bloom can be used to calculate how the value of
                    a saving could change over time. This can then be viewed on
                    a graph in the Dashboard.
                </Typography>
                <Typography paragraph>
                    This begins with a Start Amount, which is the value assigned
                    to the saving in the Start Month.
                </Typography>
                <Typography paragraph>
                    Following this the value will be calculated in subsequent
                    months using a Monthly Amount (a constant amount added to
                    the total value) and a Yearly Rate (a rate added to the
                    total value applied monthly,{' '}
                    <StyledLink
                        key="yearly rate explanation"
                        component={RouterLink}
                        to={'/faq/yearly-rate-explained'}
                        target="_blank"
                    >
                        explained further here
                    </StyledLink>
                    ). This will continue monthly until the End Date is reached.
                </Typography>
                <Typography>
                    It is possible to make{' '}
                    <StyledLink
                        key="adjustments explanation"
                        component={RouterLink}
                        to={'/faq/adjustments-explained'}
                        target="_blank"
                    >
                        adjustments
                    </StyledLink>{' '}
                    to the Monthly Amount and Yearly Rate values, and also apply{' '}
                    <StyledLink
                        key="one-time payments explanation"
                        component={RouterLink}
                        to={'/faq/one-time-payments-explained'}
                        target="_blank"
                    >
                        one-off payments
                    </StyledLink>
                    .
                </Typography>
            </div>
        ),
    },
    {
        id: 'debts-in-bloom',
        title: 'What is a debt in Bloom and how does it work?',
        content: (
            <div>
                <Typography paragraph>
                    A debt in Bloom can be used to calculate how the value of a
                    debt could change over time. This can then be viewed on a
                    graph in the Dashboard.
                </Typography>
                <Typography paragraph>
                    This begins with a Start Amount, which is the value assigned
                    to the debt in the Start Month.
                </Typography>
                <Typography paragraph>
                    Following this the value will be calculated in subsequent
                    months using a Monthly Amount (a constant amount added to
                    the total value) and a Yearly Rate (a rate added to the
                    total value applied monthly,{' '}
                    <StyledLink
                        key="yearly rate explanation"
                        component={RouterLink}
                        to={'/faq/yearly-rate-explained'}
                        target="_blank"
                    >
                        explained further here
                    </StyledLink>
                    ). This will continue monthly until the value reaches £0.00
                    or December 2050 is reached.
                </Typography>
                <Typography>
                    It is possible to make{' '}
                    <StyledLink
                        key="adjustments explanation"
                        component={RouterLink}
                        to={'/faq/adjustments-explained'}
                        target="_blank"
                    >
                        adjustments
                    </StyledLink>{' '}
                    to the Monthly Amount and Yearly Rate values, and also apply{' '}
                    <StyledLink
                        key="one-time payments explanation"
                        component={RouterLink}
                        to={'/faq/one-time-payments-explained'}
                        target="_blank"
                    >
                        one-off payments
                    </StyledLink>
                    .
                </Typography>
            </div>
        ),
    },
    {
        id: 'adjustments-explained',
        title: 'What are Adjustments in Bloom?',
        content: (
            <div>
                <Typography paragraph>
                    An adjustment allows for the monthly amount and yearly rate
                    values to be changed at a provided date.
                </Typography>
                <Typography>
                    The new monthly amount will be used in the provided month,
                    while the new yearly rate will be applied in the following
                    month.
                </Typography>
            </div>
        ),
    },
    {
        id: 'one-time-payments-explained',
        title: 'What are One Time Payments in Bloom?',
        content: (
            <div>
                <Typography paragraph>
                    A one-time payment allows for a one-off payment of any value
                    to be made at a provided time.
                </Typography>
            </div>
        ),
    },
    {
        id: 'yearly-rate-explained',
        title: 'How is yearly rate applied?',
        content: (
            <div>
                <Typography paragraph>
                    It is applied on a monthly basis, meaning that interest will
                    continue to compound throughout each year.
                </Typography>
                <Typography paragraph>
                    For example, if a yearly rate of 12.00% was entered, a rate
                    of 1.00% would be applied each month to the total of the
                    previous month, rather than the total at the beginning of
                    year.
                </Typography>
                <Typography>
                    It would be possible to add additional methods of applying
                    rate in the future.
                </Typography>
            </div>
        ),
    },
    {
        id: 'debt-no-longer-plotted',
        title: 'Why has my debt stopped being plotted?',
        content: (
            <div>
                <Typography>
                    Once a debt has reached £0.00 it is no longer plotted in
                    future months.
                </Typography>
            </div>
        ),
    },
    {
        id: 'withdraw-from-a-saving',
        title: 'Can I withdraw money from a saving?',
        content: (
            <div>
                <Typography paragraph>
                    Negative values can be supplied to all inputs where it makes
                    sense.
                </Typography>
                <Typography paragraph>
                    This includes Monthly Amount, Yearly Rate and One Time
                    Amount values.
                </Typography>
                <Typography>
                    For example, to withdraw a one-off £500.00, a One Time
                    Payment (well... withdrawal) of -£500.00 could be applied.
                    Alternatively, to withdraw roughly 3.00% a year (3.00% / 12
                    months = 0.25%/month), a Yearly Rate of -3.00% could be
                    applied.
                </Typography>
            </div>
        ),
    },
    {
        id: 'increase-debt-value',
        title: 'Can I withdraw money from a saving?',
        content: (
            <div>
                <Typography paragraph>
                    Negative values can be supplied to Monthly Amount and One
                    Time Amounts to achieve this.
                </Typography>
                <Typography>
                    For example, to increase the value of a debt by £500.00, a
                    One Time Amount of -£500.00 could be applied.
                </Typography>
            </div>
        ),
    },
    {
        id: 'add-or-change-a-feature',
        title: 'Can you please add or change a feature?',
        content: (
            <div>
                <Typography paragraph>
                    This has been a project, with a limited and selective scope,
                    undertaken for my final year project at university. In the
                    coming months I will be primarily focusing on exams.
                </Typography>
                <Typography>
                    So while I would like to be able to work on Bloom more, it
                    is unlikely to see any major changes soon. However, if you
                    do have any feedback, I would love to hear it!{' '}
                    <StyledLink
                        key="about"
                        component={RouterLink}
                        to={'/about'}
                        target="_blank"
                    >
                        Please get in contact through any of the methods
                        outlined here.
                    </StyledLink>
                </Typography>
            </div>
        ),
    },
];

export default faqs;
