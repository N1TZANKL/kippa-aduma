import React, { useCallback } from "react";
import { withStyles, Theme, WithStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { usePopoverState } from "utils/hooks";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Menu from "components/Menu";
import { useRouter } from "next/router";

const styles = (theme: Theme) =>
    createStyles({
        icon: {
            fontSize: 36,
        },
        menuItemWrapper: {
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
        },
        menuItemIcon: {
            marginRight: 12,
        },
    });

function AccountButton(props: WithStyles<typeof styles>) {
    const { classes } = props;

    const router = useRouter();
    const signOut = useCallback(async () => {
        await fetch("/api/user/logout");
        router.push("/login");
    }, [router]);

    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    return (
        <>
            <IconButton
                title="Account Options"
                children={<AccountCircleIcon className={classes.icon} />}
                onClick={setAnchorEl}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={clearAnchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                items={[
                    { title: "My Profile", icon: AccountCircleIcon },
                    { title: "Sign Out", icon: LogoutIcon, onClick: signOut },
                ]}
            />
        </>
    );
}

export default withStyles(styles)(AccountButton);
