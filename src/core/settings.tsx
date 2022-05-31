import * as React from 'react';

export type Settings = {};

export const { Provider, Consumer } = React.createContext<Settings>({});
