import { Link as ReachLink } from "@reach/router";
import React, { PureComponent } from "react";
import Link, { LinkProps } from "@material-ui/core/Link";

export interface AppLinkProps extends LinkProps {
  to: string;
}

export class AppLink extends PureComponent<AppLinkProps> {
  render() {
    return (
      <Link component={ReachLink} to={this.props.to} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}
