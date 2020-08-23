import { WithStyles } from "@material-ui/core/styles";

export type MuiStyles = WithStyles<string>;
export type Children = React.ReactNode;

export type PageLayoutProps = MuiStyles & { children: Children };
