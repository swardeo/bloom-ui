import React from 'react';
import Page from './index';
import { Typography } from '@material-ui/core';

export default {
    title: 'Components/Page',
    component: Page,
};

export const StadardPage = () => (
    <Page>
        <Typography variant="h3">Header</Typography>
        <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eros
            nisi, fermentum sed aliquet eu, ullamcorper et arcu. Curabitur
            dignissim diam sit amet tristique fringilla. Donec semper accumsan
            semper. In diam nulla, pellentesque vitae pellentesque eget, feugiat
            id ante. Curabitur ut augue elementum ipsum aliquet condimentum.
            Quisque lacinia urna enim, nec vulputate leo porttitor et. Nam eu
            aliquam tortor. Phasellus erat tellus, varius a massa id, dapibus
            luctus felis. Nulla ullamcorper tristique pulvinar. Nullam dignissim
            purus magna, sit amet tincidunt enim egestas quis. Donec non augue
            efficitur, laoreet eros vel, mattis mauris. Aliquam interdum
            imperdiet nunc eget facilisis. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Proin placerat
            consequat augue, non sodales erat scelerisque ac. In iaculis rhoncus
            velit, ut ullamcorper libero tempus sit amet.
        </Typography>
    </Page>
);

export const NoContentPage = () => (
    <Page>
        <></>
    </Page>
);

export const LargePage = () => (
    <Page maxWidth="lg">
        <></>
    </Page>
);
