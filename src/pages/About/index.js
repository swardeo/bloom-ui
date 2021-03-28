import React from 'react';
import { Header, Footer } from '../../components';
import { styled } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Grid,
    Link,
    Divider,
    IconButton,
} from '@material-ui/core';
import { GitHub, LinkedIn } from '@material-ui/icons';
import photo from '../../assets/about-photo.jpg';

const StyledPhoto = styled('img')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: '150px',
    },
    height: '250px',
    borderRadius: '50%',
    paddingBottom: theme.spacing(1),
}));

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
    background: `linear-gradient(90deg, rgba(69,123,157,1) 20%, rgba(133,204,206,1) 100%)`,
    height: '150px',
});

const StyledSecondaryHeadingBackground = styled(StyledBackground)({
    background: `radial-gradient(circle, rgba(29,53,87,1) 70%, rgba(51,92,117,1) 95%)`,
    height: '100px',
});

const StyledGridItem = styled(Grid)({
    textAlign: 'center',
});

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
}));

const About = () => {
    return (
        <>
            <Header />
            <StyledHeadingBackground>
                <StyledHeaderText variant="h3" align="center">
                    How did Bloom come to be?
                </StyledHeaderText>
            </StyledHeadingBackground>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <StyledGridItem item md={7} xs={12}>
                        <Typography variant="h6" paragraph>
                            Bloom has been created by Sam Ward for his Final
                            Year Project as an undergraduate Computer Science
                            student at Aston University.
                        </Typography>
                        <Typography paragraph>
                            The project is designed to provide an opportunity to
                            explore an area of interest while, drawing from all
                            of the experience gained during the time spent as a
                            student.
                        </Typography>
                        <Typography paragraph>
                            This project also applies much of what was learned
                            whilst completing a placement year at{' '}
                            <StyledLink
                                href="https://capitalone.co.uk/"
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                Capital One
                            </StyledLink>{' '}
                            as a Software Engineer, where I completed rotations
                            in both platform services and web teams. Whilst
                            there, I also became an AWS Certified Solution
                            Architect (Associate). Capital One is where I will
                            be happily returning to following graduation.
                        </Typography>
                        <Typography paragraph>
                            My primary interests are in backend web development,
                            DevOps and cloud technologies. Hence, I tried to
                            choose a topic with financial basis which I could
                            apply these to, whilst also challenging myself on
                            the frontend side. Altogether, this has been the
                            largest individual project I've undertaken to date,
                            providing much to reflect on and learn from.
                        </Typography>
                        <Typography>
                            The project is worth 1/3rd of the total grade for
                            the final year at Aston, with the deliverable being
                            worth roughly 30% of this (making the deliverable
                            worth roughly 1/10th of the final year score). Other
                            assessed areas include background research, project
                            process and professionalism, evaluation and
                            reflection, and exposition.
                        </Typography>
                    </StyledGridItem>
                    <StyledGridItem item md={5} xs={12}>
                        <Typography variant="h6">
                            Thank you for viewing my project!
                        </Typography>
                        <Typography paragraph>
                            Please feel free to provide feedback using the
                            methods below.
                        </Typography>
                        <StyledPhoto src={photo} alt="Photo" />
                        <Typography variant="h5">Sam Ward</Typography>
                        <Typography>wards4 (at) aston.ac.uk</Typography>
                        <>
                            <IconButton
                                href="https://github.com/swardeo"
                                color="primary"
                                target="_blank"
                                rel="noopener"
                            >
                                <GitHub fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="https://www.linkedin.com/in/samward99"
                                color="primary"
                                target="_blank"
                                rel="noopener"
                            >
                                <LinkedIn fontSize="large" />
                            </IconButton>
                        </>
                    </StyledGridItem>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item md={1} />
                    <StyledGridItem item md={10} xs={12}>
                        <StyledSecondaryHeadingBackground>
                            <StyledHeaderText variant="h4" align="center">
                                The Bloom source code is publicly accessible!
                            </StyledHeaderText>
                        </StyledSecondaryHeadingBackground>
                        <Typography paragraph>
                            <StyledLink
                                href="https://github.com/swardeo/bloom-services"
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                Bloom Services
                            </StyledLink>{' '}
                            – Java (following TDD using JUnit 5, AssertJ,
                            Mockito), AWS (Cognito, Lambda, API Gateway,
                            DynamoDB).
                        </Typography>
                        <Typography paragraph>
                            <StyledLink
                                href="https://github.com/swardeo/bloom-ui"
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                Bloom UI
                            </StyledLink>{' '}
                            – React (using Material UI, AWS Amplify), AWS (S3,
                            CloudFront).
                        </Typography>
                        <Typography gutterBottom>
                            AWS resources modelled using AWS CloudFormation.
                            CI/CD performed using GitHub Actions.
                        </Typography>
                    </StyledGridItem>
                    <Grid item md={1} />
                </Grid>
                <Typography align="right" gutterBottom>
                    Last updated: 23/03/21
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default About;
