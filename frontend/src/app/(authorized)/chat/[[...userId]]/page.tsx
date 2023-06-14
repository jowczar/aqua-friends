"use client";

import React from "react";
import { ChannelSort, ChannelFilters, ChannelOptions } from "stream-chat";
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
import { notFound } from "next/navigation";

import Loader from "@/components/Loader";

import "./chat.styles.css";
import useConnectUser from "./useConnectUser";
import CustomChannelPreview from "./CustomChannelPreview";
import ActiveChannelSychronizer from "./ActiveChannelSychronizer";

const App = ({ params: { userId } }: { params: { userId: string[] } }) => {
  // NextJS does not support optional catch-all routes yet so we have to programmatically
  // forbid access to the page if there is more than optional userId provided (e.g. /chat/userId/somethingElse)
  if (userId?.length > 1) {
    notFound();
  }

  const initialConversationUserId = userId?.[0] || null;
  const { client, chatUserId, chatToken } = useConnectUser();

  const filters = {
    type: "messaging",
    members: { $in: [chatUserId] },
  } as ChannelFilters;
  const options = { state: true, presence: true, limit: 10 } as ChannelOptions;
  const sort = { last_message_at: -1 } as ChannelSort;

  const channelListOptions = {
    filters,
    options,
    sort,
  };

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
        {chatToken && (
          <ActiveChannelSychronizer
            initialConversationUserId={initialConversationUserId}
          />
        )}
        <ChannelList
          {...channelListOptions}
          Preview={(props) => <CustomChannelPreview {...props} />}
        />
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
