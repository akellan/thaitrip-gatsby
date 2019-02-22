import { Link as ReachLink } from "@reach/router";
import React, { PureComponent } from "react";
import Link, { LinkProps } from "@material-ui/core/Link";

export interface AppLinkProps extends LinkProps {
  to: string;
}

export class AppLink extends PureComponent<AppLinkProps> {
  render() {
    const color = this.props.color as any;
    return (
      <Link
        component={ReachLink}
        to={this.props.to}
        color={color}
        {...this.props}
      >
        {this.props.children}
      </Link>
    );
  }
}
