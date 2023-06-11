"use client";

import React, { useEffect, useState } from "react";
import {
  StreamChat,
  ChannelSort,
  ChannelFilters,
  ChannelOptions,
} from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { toast } from "react-toastify";

import useChat from "@/hooks/useChat";
import Loader from "@/components/Loader";

import "./chat.styles.css";

const App = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const { chatToken, userId: chatUserId, username } = useChat();

  const filters = {
    type: "messaging",
    members: { $in: [chatUserId] },
  } as ChannelFilters;
  const options = { state: true, presence: true, limit: 10 } as ChannelOptions;
  const sort = { last_message_at: -1 } as ChannelSort;

  useEffect(() => {
    if (!chatToken || !chatUserId) return;

    const newClient = new StreamChat(
      process.env.NEXT_PUBLIC_STREAM_API_KEY || ""
    );

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return toast.error("Connection lost...");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);
    newClient.connectUser(
      {
        id: chatUserId,
        name: username || "Anonymous",
      },
      chatToken
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser();
    };
  }, [chatToken, chatUserId, username]);

  if (!client) {
    return (
      <div className="flex items-center justify-center mx-auto bg-white px-12 py-8 rounded shadow my-10 max-w-2xl">
        <Loader text="Loading your messages" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full md:h-[calc(100vh-4rem)]">
      <Chat client={client}>
        <ChannelList filters={filters} sort={sort} options={options} />
        {/* TODO: channel={channel} can be used to set a specific channel e.g. when we are redirected here from the list of users */}
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default App;
