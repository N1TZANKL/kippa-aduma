import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { usePopoverState } from "utils/hooks";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Menu from "components/general/Menu";
import { useRouter } from "next/router";
import UserAvatar from "components/general/UserAvatar";
import { UserSessionObject } from "interfaces";

type AccountButtonProps = { user?: UserSessionObject };

function AccountButton(props: AccountButtonProps) {
    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    const router = useRouter();

    const _signOut = useCallback(async () => {
        await fetch("/api/user/logout");
        router.push("/login");
    }, [router]);

    const { user } = props;

    return (
        <>
            <IconButton title="Account Options" onClick={user ? setAnchorEl : undefined}>
                {user ? (
                    <UserAvatar variant="circle" withBorder color={user.color} nickname={user.nickname} size={36} />
                ) : (
                    <AccountCircleIcon style={{ fontSize: 36 }} />
                )}
            </IconButton>
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
                    { title: "Sign Out", icon: LogoutIcon, onClick: _signOut },
                ]}
            />
        </>
    );
}

export default AccountButton;