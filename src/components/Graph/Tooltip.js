import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const StyledTooltip = styled('div')(({ theme }) => ({
    background: theme.palette.background.default,
    padding: '9px 12px',
    border: `1px solid ${theme.palette.secondary.main}`,
}));

const StyledDate = styled('div')({
    textAlign: 'center',
});

const StyledPoint = styled('div')({
    paddingLeft: '3px',
    paddingRight: '3px',
});

const Chip = styled('span')(({ color }) => ({
    display: 'inline-block',
    width: '12px',
    height: '12px',
    background: color,
}));

const Tooltip = ({ slice }) => {
    return (
        <StyledTooltip>
            <StyledDate>
                <Typography variant="body2" gutterBottom>
                    <strong>{slice.points[0].data.xFormatted}</strong>
                </Typography>
            </StyledDate>
            {slice.points.map((point) => (
                <StyledPoint key={point.id}>
                    <Typography variant="body2" gutterBottom>
                        <Chip color={point.serieColor} /> {point.serieId}:{' '}
                        <strong>£{point.data.yFormatted}</strong>
                    </Typography>
                </StyledPoint>
            ))}
        </StyledTooltip>
    );
};

export default Tooltip;
