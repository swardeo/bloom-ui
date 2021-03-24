import React, { useState } from 'react';
import { Header, Footer, Example } from '../../components';
import { styled } from '@material-ui/core/styles';
import {
    AppBar,
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Paper,
} from '@material-ui/core';

const StyledHeaderText = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
}));

const StyledBackground = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));

const StyledHeadingBackground = styled(StyledBackground)({
    background: `radial-gradient(circle, rgba(29,53,87,1) 25%, rgba(69,123,157,1) 100%)`,
    height: '150px',
});

const StyledAppBar = styled(AppBar)({
    background: '#E6EFF4',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const TabPanel = ({ value, index, type }) => {
    return (
        value === index && (
            <StyledPaper>
                <Box p={3}>
                    <Example type={type} />
                </Box>
            </StyledPaper>
        )
    );
};

const Examples = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Header />
            <StyledHeadingBackground>
                <StyledHeaderText variant="h3" align="center">
                    What can be achieved when using Bloom?
                </StyledHeaderText>
            </StyledHeadingBackground>
            <Container>
                <StyledAppBar position="static">
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        centered
                    >
                        <Tab label="Savings" />
                        <Tab label="Debts" />
                        <Tab label="Complex" />
                    </Tabs>
                </StyledAppBar>
                <TabPanel value={value} index={0} type="savings" />
                <TabPanel value={value} index={1} type="debts" />
                <TabPanel value={value} index={2} type="complex" />
            </Container>
            <Footer />
        </>
    );
};

export default Examples;
