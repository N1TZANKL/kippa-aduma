import React from "react";
import { mdiHome, mdiFolderKey, mdiNotebook, mdiFolderAccount, mdiChat, mdiNote } from "@mdi/js";

export type Route = {
    title: string;
    icon: string;
    path: string;
    component: React.ReactElement;
};

export default [
    {
        title: "Home",
        icon: mdiHome,
        path: "/",
    },
    {
        title: "Credentials",
        icon: mdiFolderKey,
        path: "/credentials",
    },
    {
        title: "Tasks",
        icon: mdiNote,
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
