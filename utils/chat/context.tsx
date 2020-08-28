import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(`localhost:${process.env.CHAT_PORT}`);

export const SocketContext = React.createContext(socket);
