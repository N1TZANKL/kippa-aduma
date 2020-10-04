import React from "react";
import {
    mdiHome, mdiAccountKey, mdiNotebook, mdiFolderAccount, mdiChat, mdiClipboardList,
} from "@mdi/js";
import { CSSProperties } from "@material-ui/styles";

export type Route = {
    title: string;
    icon: string;
    path: string;
    component: React.ReactElement;
    iconStyle?: CSSProperties;
};

export default [
    {
        title: "Home",
        icon: mdiHome,
        path: "/",
        component: <div>Home</div>,
    },
    {
        title: "Passwords",
        icon: mdiAccountKey,
        iconStyle: { marginRight: 6 },
        path: "/passwords",
        component: <div>Passwords</div>,
    },
    {
        title: "Assignments",
        icon: mdiClipboardList,
        path: "/assignments",
        component: <div>Assignments</div>,
    },
    {
        title: "Operations",
        icon: mdiNotebook,
        path: "/operations",
        component: <div>Operations</div>,
    },
    {
        title: "Storage",
        icon: mdiFolderAccount,
        path: "/storage",
        component: <div>Storage</div>,
    },
    {
        title: "Chat",
        icon: mdiChat,
        path: "/chat",
        component: <div>Chat</div>,
    },
] as Route[];
