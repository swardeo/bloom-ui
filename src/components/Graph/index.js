import React from 'react';
import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line';
import { Typography, useMediaQuery } from '@material-ui/core';
import Tooltip from './Tooltip';
import PropTypes from 'prop-types';

const Graph = ({ data }) => {
    const isSmallScreen = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );

    const commonProperties = {
        data: data,
        margin: { top: 20, right: 150, bottom: 50, left: 60 },
        xScale: {
            type: 'time',
            format: '%Y-%m',
            precision: 'month',
            max: 'auto',
        },
        xFormat: 'time:%Y-%m',
        yScale: { type: 'linear' },
        yFormat: '>-,.2f',
        axisLeft: { legend: 'Amount (£)', legendOffset: 12, format: '>-,.0f' },
        pointSize: 0,
        legends: [
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 110,
                translateY: 0,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                itemWidth: 90,
                itemHeight: 15,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ],
    };

    return isSmallScreen ? (
        <>
            <Typography>
                It is recommended to use the application on a computer or tablet
                for an optimal experience.
            </Typography>
            <div style={{ height: 400, minWidth: 450 }}>
                <ResponsiveLineCanvas
                    {...commonProperties}
                    axisBottom={{
                        format: '%b %Y',
                        legend: 'Time',
                        legendOffset: -12,
                        tickValues: 2,
                    }}
                />
            </div>
        </>
    ) : (
        <div style={{ height: 600 }}>
            <ResponsiveLine
                {...commonProperties}
                axisBottom={{
                    format: '%b %Y',
                    legend: 'Time',
                    legendOffset: -12,
                }}
                enableSlices="x"
                sliceTooltip={({ slice }) => <Tooltip slice={slice} />}
            />
        </div>
    );
};

Graph.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Graph;
