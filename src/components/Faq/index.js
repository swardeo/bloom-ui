import React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, Typography } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import faqs from '../../text/faqs';

const StyledSummary = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h6.fontSize,
}));

const Faq = ({ id }) => {
    const found = faqs.find((faq) => faq.id === id);
    const items = found ? [found] : faqs;
    const defaultExpansion = items.length === 1;

    return (
        <>
            {items.map(({ id, title, content }) => (
                <Accordion key={id} defaultExpanded={defaultExpansion}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <StyledSummary variant="h6">{title}</StyledSummary>
                    </AccordionSummary>
                    <AccordionDetails>{content}</AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

Faq.propTypes = {
    id: PropTypes.string,
};

export default Faq;
