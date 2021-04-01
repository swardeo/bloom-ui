import React from 'react';
import { Header, Footer } from '../../components';
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const WhiteText = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    textAlign: 'center',
}));

const BoldWhiteText = styled(WhiteText)({
    fontWeight: 'bold',
});

const BoldText = styled(Typography)({
    fontWeight: 'bold',
});

const BaseBackground = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

const StyledTopBackground = styled(BaseBackground)(({ theme }) => ({
    [theme.breakpoints.down('xs')]: {
        height: '400px',
    },
    background: `#1D3557`,
    height: '275px',
}));

const StyledMiddleBackground = styled('div')(({ theme }) => ({
    padding: `${theme.spacing(1)}px 0`,
    background: `#CDDFE9`,
}));

const StyledBottomBackground = styled(BaseBackground)(({ theme }) => ({
    background: `linear-gradient(0deg, rgba(252,230,232,1) 85%, rgba(205,223,233,1) 100%)`,
    height: '250px',
    paddingTop: theme.spacing(2),
}));

const BaseMiddleSubheading = styled('div')(({ theme }) => ({
    background: theme.palette.secondary.main,
    margin: theme.spacing(2),
    height: '65px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const LeftMiddleSubheading = styled(BaseMiddleSubheading)({
    clipPath: `polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)`,
});

const RightMiddleSubheading = styled(BaseMiddleSubheading)({
    clipPath: `polygon(5% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 50%)`,
});

const StyledGridItem = styled(Grid)({
    textAlign: 'center',
});

const Home = () => {
    return (
        <>
            <Header />
            <StyledTopBackground>
                <Container style={{ textAlign: 'center' }}>
                    <BoldWhiteText variant="h3" paragraph>
                        Helping you achieve long-term financial goals
                    </BoldWhiteText>
                    <WhiteText variant="h5" paragraph>
                        Accurately explore a forecast of your financial
                        situation using Bloom
                    </WhiteText>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={<NavigateNext />}
                        component={RouterLink}
                        to="/register"
                    >
                        Get Started
                    </Button>
                </Container>
            </StyledTopBackground>
            <StyledMiddleBackground>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <StyledGridItem item md={7} xs={12}>
                            <LeftMiddleSubheading>
                                <BoldWhiteText variant="h4">
                                    Visualise your journey
                                </BoldWhiteText>
                            </LeftMiddleSubheading>
                            <Typography variant="h5" gutterBottom>
                                See how your financial landscape unfolds, before
                                it happens.
                            </Typography>
                            <Typography variant="h6">
                                Understand the impact of each decision made on
                                your broader finances.
                            </Typography>
                        </StyledGridItem>
                        <Grid item md={5} />
                        <Grid item md={5} />
                        <StyledGridItem item md={7} xs={12}>
                            <RightMiddleSubheading>
                                <BoldWhiteText variant="h4">
                                    Have complete precision
                                </BoldWhiteText>
                            </RightMiddleSubheading>
                            <Typography variant="h5" gutterBottom>
                                Be in total control of how each outcome is
                                reached.
                            </Typography>
                            <Typography variant="h6">
                                Calculate the value of savings and debts over
                                time by changing monthly payments, adding
                                one-off payments or changing the interest rate
                                at any time.
                            </Typography>
                        </StyledGridItem>
                        <StyledGridItem item md={7} xs={12}>
                            <LeftMiddleSubheading>
                                <BoldWhiteText variant="h4">
                                    Plan for all outcomes
                                </BoldWhiteText>
                            </LeftMiddleSubheading>
                            <Typography variant="h5" gutterBottom>
                                Visualise the implications of every possibility
                                in advance.
                            </Typography>
                            <Typography variant="h6">
                                Try different combinations to find your winning
                                scenario, no matter what actually happens.
                            </Typography>
                        </StyledGridItem>
                        <Grid item md={5} />
                    </Grid>
                </Container>
            </StyledMiddleBackground>
            <StyledBottomBackground>
                <BoldText variant="h4" paragraph>
                    Still unsure?
                </BoldText>
                <Typography variant="h5" align="center" paragraph>
                    View examples of what can be achieved when using Bloom
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<NavigateNext />}
                    component={RouterLink}
                    to="/examples"
                >
                    Go To Examples
                </Button>
            </StyledBottomBackground>
            <Footer />
        </>
    );
};

export default Home;
