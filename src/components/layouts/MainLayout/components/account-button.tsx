import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";

import { usePopoverState } from "src/utils/hooks";
import Menu from "src/components/general/Menu";
import UserAvatar from "src/components/general/UserAvatar";
import { UserSessionObject } from "utils/session";

type AccountButtonProps = { user?: UserSessionObject };

function AccountButton({ user }: AccountButtonProps): React.ReactElement {
    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    const router = useRouter();

    function signOut() {
        fetch("/api/user/logout").then((res) => {
            if (res.ok) router.push("/login");
        });
    }

    return (
        <>
            <IconButton title="Account Options" onClick={user ? setAnchorEl : undefined}>
                {user ? (
                    <UserAvatar variant="circle" withBorder color={user.color} nickname={user.nickname} size={36} />
                ) : (
                    <AccountCircleIcon fontSize="large" />
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
                    { title: "Sign Out", icon: LogoutIcon, onClick: signOut },
                ]}
            />
        </>
    );
}

export default AccountButton;
