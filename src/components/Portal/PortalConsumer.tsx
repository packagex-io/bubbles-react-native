import * as React from 'react';
import type { PortalMethods } from './PortalHost';

type Props = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default class PortalConsumer extends React.Component<Props> {
  async componentDidMount() {
    this.checkManager();
    console.log('before here');
    // Delay updating to prevent React from going to infinite loop
    // await Promise.resolve();
    console.log('here');
    this.key = this.props.manager.mount(this.props.children);
  }

  componentDidUpdate() {
    this.checkManager();

    this.props.manager.update(this.key, this.props.children);
  }

  componentWillUnmount() {
    this.checkManager();

    this.props.manager.unmount(this.key);
  }

  private key: any;

  private checkManager() {
    if (!this.props.manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component from `PackageX`.\n\n'
      );
    }
  }

  render() {
    return null;
  }
}
