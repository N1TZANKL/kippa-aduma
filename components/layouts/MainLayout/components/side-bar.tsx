import React from "react";
import { lighten, withStyles, WithStyles, Theme, createStyles, WithTheme } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import SvgIcon from "@material-ui/core/SvgIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

import routes, { Route } from "config/routes";

const styles = (theme: Theme) =>
    createStyles({
        sidebar: {
            borderRadius: 0,
            height: "calc(100% - 65px)",
            width: 70,
            backgroundColor: theme.constants.appBackgroundDark,
            borderRight: `1px solid ${theme.constants.appBackgroundHighlight}`,
            zIndex: 1,
            boxShadow: `0px 0px 7px 1px ${theme.constants.appBackgroundHighlight}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
        },
        sidebarBox: {
            width: 70,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: `1px solid ${theme.constants.appBackgroundHighlight}`,
            "&:hover": {
                backgroundColor: lighten(theme.constants.appBackgroundDark, 0.15),
            },
            cursor: "pointer",
        },
        sidebarIcon: {
            fontSize: 28,
        },
        iconButton: {
            marginBottom: 15,
        },
        icon: {
            fontSize: 28,
        },
    });

function Sidebar({ classes }: WithStyles<typeof styles>) {
    return (
        <Card className={classes.sidebar}>
            <div>
                {routes.map((route) => (
                    <SidebarBox key={route.path} route={route} />
                ))}
            </div>
            <IconButton title="Settings" className={classes.iconButton}>
                <SettingsIcon className={classes.icon} />
            </IconButton>
        </Card>
    );
}

export default withStyles(styles)(Sidebar);

type SidebarBoxProps = WithStyles<typeof styles> & WithTheme & { route: Route };

function SidebarBoxComponent(props: SidebarBoxProps) {
    const { classes, theme, route } = props;

    const router = useRouter();

    const currentPath = router.pathname;
    const currentPathHighlightColor = lighten(theme.constants.appBackgroundDark, 0.1);

    return (
        <Link href={route.path}>
            <div
                className={classes.sidebarBox}
                title={route.title}
                style={{ backgroundColor: route.path === currentPath ? currentPathHighlightColor : undefined }}
            >
                <SvgIcon className={classes.sidebarIcon} style={route.iconStyle}>
                    <path d={route.icon} />
                </SvgIcon>
            </div>
        </Link>
    );
}

const SidebarBox = withStyles(styles, { withTheme: true })(SidebarBoxComponent);
