import { addDecorator } from '@storybook/react';
import RouterDecorator from './routerDecorator';
import ThemeDecorator from './themeDecorator';

addDecorator(RouterDecorator);
addDecorator(ThemeDecorator);
