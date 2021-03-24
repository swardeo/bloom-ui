import React, { useState } from 'react';
import { Graph } from '..';
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import examples from '../../content/examples';
import PropTypes from 'prop-types';

const StyledBox = styled(Box)({
    textAlign: 'center',
});

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const Example = ({ type }) => {
    const [step, setStep] = useState(0);

    const example = examples.get(type);
    const currentStep = example[step];

    const handleChange = (newStep) => {
        setStep(newStep);
    };

    return (
        <>
            <Typography variant="h4" align="center" paragraph>
                {currentStep.title}
            </Typography>
            {currentStep.description}
            <StyledDivider />
            <Graph data={currentStep.data} />
            <StyledBox>
                <ButtonGroup color="secondary" variant="contained">
                    <Button
                        onClick={() => handleChange(step - 1)}
                        disabled={step === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => handleChange(step + 1)}
                        disabled={step === example.length - 1}
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </StyledBox>
        </>
    );
};

Example.defaultProps = {
    type: 'savings',
};

Example.propTypes = {
    type: PropTypes.oneOf(['savings', 'debts', 'complex']),
};

export default Example;
