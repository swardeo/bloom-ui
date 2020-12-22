import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledHeading = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const StyledSubheading = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)({
    paddingTop: 0,
    paddingBottom: 0,
});

const StyledListItemText = styled(ListItemText)({
    marginTop: 0,
    marginBottom: 0,
});

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

const protectionRight = (title, description) => {
    return (
        <>
            <strong>{title}</strong> {description}
        </>
    );
};

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <Container maxWidth="md">
                <StyledHeading variant="h4" align="center" gutterBottom>
                    Bloom's Privacy Policy
                </StyledHeading>
                <Typography paragraph>
                    Bloom has been created by Sam Ward for his Computer Science
                    Final Year Project at Aston University. This privacy policy
                    will explain how Bloom uses the personal data it collects
                    from you when you use this website.
                </Typography>
                <Divider />
                <StyledSubheading variant="h6" gutterBottom>
                    Topics:
                </StyledSubheading>
                <List disablePadding>
                    <StyledListItem>
                        <StyledListItemText primary="• What data do we collect?" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• How do we collect your data?" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• How will we use your data?" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• How do we store your data?" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Marketing" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• What are your data protection rights?" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Cookies" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Privacy policies of other websites" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Changes to our privacy policy" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• How to contact us" />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• How to contact the appropriate authority" />
                    </StyledListItem>
                </List>
                <StyledDivider />
                <StyledSubheading variant="h6" gutterBottom>
                    What data do we collect?
                </StyledSubheading>
                <Typography>Bloom collects the following data:</Typography>
                <List>
                    <StyledListItem>
                        <StyledListItemText primary="• Personal identification information (email address, first name)." />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Financial information (current savings, debts and their expected future performance)." />
                    </StyledListItem>
                </List>
                <StyledSubheading variant="h6" gutterBottom>
                    How do we collect your data?
                </StyledSubheading>
                <Typography>
                    You directly provide Bloom with most of the data we collect.
                    We collect data and process data when you:
                </Typography>
                <List>
                    <StyledListItem>
                        <StyledListItemText primary="• Register online for our service." />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Voluntarily complete a customer survey or provide feedback." />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Use or view our website via your browser’s cookies." />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Voluntary enter financial information to use our service." />
                    </StyledListItem>
                </List>
                <StyledSubheading variant="h6" gutterBottom>
                    How will we use your data?
                </StyledSubheading>
                <Typography>
                    Bloom collects your data so that we can:
                </Typography>
                <List>
                    <StyledListItem>
                        <StyledListItemText primary="• Process your financial forecast and manage your account." />
                    </StyledListItem>
                    <StyledListItem>
                        <StyledListItemText primary="• Email you with updates about the service we provide." />
                    </StyledListItem>
                </List>
                <StyledSubheading variant="h6" gutterBottom>
                    How do we store your data?
                </StyledSubheading>
                <Typography paragraph>
                    Bloom securely stores your data using Amazon Web Services in
                    the eu-west-2 (London) region. Your data will always be
                    transferred using the HTTPS protocol (encryption in transit)
                    and is fully encrypted at rest.
                </Typography>
                <Typography>
                    Bloom will keep your data for one year of account
                    inactivity. Once this time period has expired, we will
                    delete your data by removing your account and its associated
                    data.
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    Marketing
                </StyledSubheading>
                <Typography paragraph>
                    Bloom would like to send you information about updates to
                    our services. If you have agreed to receive marketing, you
                    may always opt out at a later date.
                </Typography>
                <Typography>
                    You have the right at any time to stop Bloom from contacting
                    you for marketing purposes. If you no longer wish to be
                    contacted for marketing purposes, please delete your
                    account.
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    What are your data protection rights?
                </StyledSubheading>
                <Typography>
                    Bloom would like to make sure you are fully aware of all of
                    your data protection rights. Every user is entitled to the
                    following:
                </Typography>
                <List>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to access',
                                ' – You have the right to request Bloom for copies of your personal data.'
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to rectification',
                                ' – You have the right to request that Bloom correct any information you believe is inaccurate. You also have the right to request Bloom to complete the information you believe is incomplete.'
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to erasure',
                                ' – You have the right to request that Bloom erase your personal data, under certain conditions.'
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to restrict processing',
                                ' – You have the right to request that Bloom restrict the processing of your personal data, under certain conditions.'
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to object to processing',
                                ' – You have the right to object to Bloom’s processing of your personal data, under certain conditions.'
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <StyledListItemText
                            primary={protectionRight(
                                'The right to data portability',
                                ' – You have the right to request that Bloom transfer the data that we have collected to another organization, or directly to you, under certain conditions.'
                            )}
                        />
                    </ListItem>
                </List>
                <Typography>
                    If you make a request, we have one month to respond to you.
                    If you would like to exercise any of these rights, please
                    contact us at our email: wards4@aston.ac.uk
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    Cookies
                </StyledSubheading>
                <Typography>
                    When you visit Bloom’s website, cookies are not used for any
                    purpose.
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    Privacy policies of other websites
                </StyledSubheading>
                <Typography>
                    The Bloom website contains links to other websites. Our
                    privacy policy applies only to our website, so if you click
                    on a link to another website, you should read their privacy
                    policy.
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    Changes to our privacy policy
                </StyledSubheading>
                <Typography>
                    Bloom keeps its privacy policy under regular review and
                    places any updates on this web page. This privacy policy was
                    last updated on 22 December 2020.
                </Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    How to contact us
                </StyledSubheading>
                <Typography paragraph>
                    If you have any questions about Bloom’s privacy policy, the
                    data we hold on you, or you would like to exercise one of
                    your data protection rights, please do not hesitate to
                    contact us.
                </Typography>
                <Typography>Email us at: wards4@aston.ac.uk</Typography>
                <StyledSubheading variant="h6" gutterBottom>
                    How to contact the appropriate authority
                </StyledSubheading>
                <Typography paragraph>
                    Should you wish to report a complaint or if you feel that
                    Bloom has not addressed your concern in a satisfactory
                    manner, you may contact the Information Commissioner’s
                    Office (ICO), the UK supervisory authority for data
                    protection issues, at https://ico.org.uk/global/contact-us.
                </Typography>
                <Typography align="right" gutterBottom>
                    Last updated: 22/12/20
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
