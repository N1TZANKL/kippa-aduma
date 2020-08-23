import { WithStyles } from "@material-ui/core/styles";

export type MuiStyles = WithStyles<string>;
export type Children = { children: React.ReactNode };

export type PageLayoutProps = MuiStyles & Children;
