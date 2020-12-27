import React from "react";
import { mdiHome, mdiAccountKey, mdiNotebook, mdiFolderAccount, mdiChat, mdiClipboardList } from "@mdi/js";
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
    },
    {
        title: "Credentials",
        icon: mdiAccountKey,
        iconStyle: { marginRight: 6 },
        path: "/credentials",
    },
    {
        title: "Tasks",
        icon: mdiClipboardList,
        path: "/tasks",
    },
    {
        title: "Operations",
        icon: mdiNotebook,
        path: "/operations",
    },
    {
        title: "Storage",
        icon: mdiFolderAccount,
        path: "/storage",
    },
    {
        title: "Chat",
        icon: mdiChat,
        path: "/chat",
    },
] as Route[];
