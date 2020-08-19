import React from "react";
import { mdiHome, mdiAccountKey, mdiNotebook, mdiFolderAccount, mdiChat, mdiClipboardList } from "@mdi/js";

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
];
