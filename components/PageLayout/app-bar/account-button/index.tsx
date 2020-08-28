import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { usePopoverState } from "utils/hooks";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Menu from "components/Menu";
import { useRouter } from "next/router";
import UserAvatar from "components/UserAvatar";

type AccountButtonProps = { nickname: string; color: string };

function AccountButton(props: AccountButtonProps) {
    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    const router = useRouter();

    const _signOut = useCallback(async () => {
        await fetch("/api/user/logout");
        router.push("/login");
    }, [router]);

    return (
        <>
            <IconButton
                title="Account Options"
                children={<UserAvatar variant="circle" withBorder color={props.color} nickname={props.nickname} size={36} />}
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
                    { title: "Sign Out", icon: LogoutIcon, onClick: _signOut },
                ]}
            />
        </>
    );
}

export default AccountButton;
