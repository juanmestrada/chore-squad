import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chat,
  ChannelList,
  Channel,
  Window,
  MessageInput,
  MessageList,
  Thread,
  ChannelHeader,
} from "stream-chat-react";
import { useChatContext } from "stream-chat-react/dist/context";

import { useLoggedInAuth } from "../../../context/UserContext";

import CustomModal from '../../modal/Modal';
import Loading from "../../../common/Loading";

import "./Inbox.css";

// ChannelHeader menu icon
// clears active channel
const CustomMenuIcon = () => {
    const { setActiveChannel } = useChatContext();
    return (
        <div className="back-btn" onClick={() => setActiveChannel(undefined)}>
            <svg height="24"  version="1.1" baseProfile="tiny" viewBox="0 0 42 42">
                <polygon fillRule="evenodd" points="31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 "/>
            </svg>
        </div>
    )
}

const Inbox = () => {
    const { user, streamChat } = useLoggedInAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/chore-squad/map/channel/new");
    }

    return (
        <CustomModal show={true} modalTitle="Inbox" >
            <div className="Inbox">
                {!streamChat ? (
                        <Loading />
                    ) 
                    : 
                    (
                        <Chat client={streamChat} initialNavOpen={true} >
                            <ChannelList
                                // List={Channels}
                                sendChannelsToList
                                filters={{ members: { $in: [user.id] } }}
                                setActiveChannelOnMount={false}
                            />

                            <Channel>
                                <Window  >
                                    <ChannelHeader MenuIcon={CustomMenuIcon}/>
                                    <MessageList />
                                    <MessageInput />
                                </Window>
                                <Thread />
                            </Channel>
                        </Chat>
                    )
                }
        </div>

            <div className="Inbox-New-Channel-btn" onClick={handleClick} >
                <svg aria-label="New message" className="Inbox-New-Channel-btn-svg" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
            </div>
        </CustomModal>
    )
}

export default Inbox;