import React from "react";
import { lighten, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import SvgIcon from "@material-ui/core/SvgIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";

import IconButton from "src/components/general/IconButton";
import { MuiStyles } from "src/utils/interfaces";

import routes, { Route } from "../routes";

const styles = (theme: Theme) =>
    createStyles({
        sidebar: {
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
        currentPathBox: {
            backgroundColor: lighten(theme.constants.appBackgroundDark, 0.1),
        },
    });

function Sidebar({ classes }: MuiStyles) {
    return (
        <Card className={classes.sidebar} square>
            <div>
                {routes.map((route) => (
                    <SidebarBox key={route.path} route={route} />
                ))}
            </div>
            <IconButton title="Settings" className={classes.iconButton} fontSize={28} icon={SettingsIcon} />
        </Card>
    );
}

export default withStyles(styles)(Sidebar);

type SidebarBoxProps = MuiStyles & { route: Route };

const SidebarBox = withStyles(styles)(({ classes, route }: SidebarBoxProps) => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <Link href={route.path}>
            <div className={clsx(classes.sidebarBox, route.path === currentPath && classes.currentPathBox)} title={route.title}>
                <SvgIcon className={classes.sidebarIcon} style={route.iconStyle}>
                    <path d={route.icon} />
                </SvgIcon>
            </div>
        </Link>
    );
});
