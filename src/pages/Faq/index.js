import React from 'react';
import Page from '../../components/Page';
import FaqComponent from '../../components/Faq';
import { styled } from '@material-ui/core/styles';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, Link } from '@material-ui/core';

const StyledHeading = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const StyledText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    fontSize: theme.typography.h6.fontSize,
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
}));

const Faq = () => {
    const { id } = useParams();

    return (
        <Page>
            <StyledHeading variant="h4" align="center">
                Frequently Asked Questions
            </StyledHeading>
            <FaqComponent id={id} />
            <StyledText paragraph align="center">
                If you are still unsure or have any further questions,{' '}
                <StyledLink
                    key="about"
                    component={RouterLink}
                    to={'/about'}
                    target="_blank"
                >
                    please get in contact.
                </StyledLink>
            </StyledText>
            <Typography align="right" gutterBottom>
                Last updated: 20/03/21
            </Typography>
        </Page>
    );
};

export default Faq;
