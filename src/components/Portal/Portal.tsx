import * as React from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './PortalHost';
import {
  Provider as SettingsProvider,
  Consumer as SettingsConsumer,
} from '../../core/settings';
import { ThemeProvider, withTheme } from '../../core/theming';
import type { Theme } from '../../types';

type Props = {
  /**
   * Content of the `Portal`.
   */
  children: React.ReactNode;
  /**
   * @optional
   */
  theme: Theme;
};

class Portal extends React.Component<Props> {
  // @component ./PortalHost.tsx
  static Host = PortalHost;

  render() {
    const { children, theme } = this.props;

    return (
      <SettingsConsumer>
        {(settings) => (
          <PortalContext.Consumer>
            {(manager) => (
              <PortalConsumer manager={manager as PortalMethods}>
                <SettingsProvider value={settings}>
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </SettingsProvider>
              </PortalConsumer>
            )}
          </PortalContext.Consumer>
        )}
      </SettingsConsumer>
    );
  }
}

export default withTheme(Portal);
