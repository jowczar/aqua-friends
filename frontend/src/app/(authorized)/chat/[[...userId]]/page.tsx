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
import { notFound } from "next/navigation";

import useChat from "@/hooks/useChat";
import Loader from "@/components/Loader";

import "./chat.styles.css";

const App = ({ params: { userId } }: { params: { userId: string[] } }) => {
  // NextJS does not support optional catch-all routes yet so we have to programmatically
  // forbid access to the page if there is more than optional userId provided (e.g. /chat/userId/somethingElse)
  if (userId?.length > 1) {
    notFound();
  }

  const initialConversationUserId = userId?.[0] || null;
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState(null);
  const { chatToken, userId: chatUserId, username, synchronize } = useChat();
  console.log({ initialConversationUserId });

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
    newClient
      .connectUser(
        {
          id: chatUserId,
          name: username || "Anonymous",
        },
        chatToken
      )
      .catch(console.error);

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().catch(console.error);
    };
  }, [chatToken, chatUserId, username]);

  useEffect(() => {
    if (!client || !initialConversationUserId) return;

    // TOOD: this does not check whether the initialConversationUserId is valid user id
    synchronize(initialConversationUserId).then(() => {
      console.log("synchronized");

      const channel = client.channel("messaging", {
        members: [chatUserId, initialConversationUserId],
      });

      setChannel(channel);
    });
  }, [client, initialConversationUserId]);

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
        <Channel channel={channel}>
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
