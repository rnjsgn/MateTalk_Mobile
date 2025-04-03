import React from "react";

import { TopNav } from "../../components/TopNav/TopNav";
import { ChatBox } from "./components/ChatBox/ChatBox";

export const ChatPresenter = () => {
    return(
        <TopNav>
            <ChatBox />
        </TopNav>
    )
}