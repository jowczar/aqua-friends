"use client";

import React, { useEffect } from "react";
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
  useChatContext,
} from "stream-chat-react";
import { notFound } from "next/navigation";

import useChat from "@/hooks/useChat";
import Loader from "@/components/Loader";

import "./chat.styles.css";
import useConnectUser from "./useConnectUser";
import CustomChannelPreview from "./CustomChannelPreview";

const App = ({ params: { userId } }: { params: { userId: string[] } }) => {
  // NextJS does not support optional catch-all routes yet so we have to programmatically
  // forbid access to the page if there is more than optional userId provided (e.g. /chat/userId/somethingElse)
  if (userId?.length > 1) {
    notFound();
  }

  const initialConversationUserId = userId?.[0] || null;
  const { setActiveChannel } = useChatContext();
  const { client, chatUserId } = useConnectUser();

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

  // TODO: move this somewhere
  const { synchronize } = useChat();
  console.log({ initialConversationUserId });

  useEffect(() => {
    if (!client || !initialConversationUserId) return;

    // TOOD: this does not check whether the initialConversationUserId is valid user id
    synchronize(initialConversationUserId).then(() => {
      console.log("synchronized");

      const channel = client.channel("messaging", {
        members: [chatUserId, initialConversationUserId],
        name: "My first channel", // TODO: maybe get that info from backend on synchronize? and make sure that the user with it exists – it could be also set properly in a preview (with data of the user)
      });
      channel.watch();

      setActiveChannel(channel);
    });
  }, [client, initialConversationUserId]);
  //

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
