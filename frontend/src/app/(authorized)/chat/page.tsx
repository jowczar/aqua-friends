"use client";

import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
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

import "./chat.styles.css";
import { toast } from "react-toastify";
import useChat from "@/hooks/useChat";
import Loader from "@/components/Loader";

const App = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const { chatToken, userId: chatUserId, username } = useChat();
  const filters = { type: "messaging", members: { $in: [chatUserId] } };
  const options = { state: true, presence: true, limit: 10 };
  const sort = { last_message_at: -1 };

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

    console.log("chatToken", chatToken, "chatUserId", chatUserId);

    newClient.connectUser(
      {
        id: chatUserId,
        name: username || "Anonymous",
      },
      chatToken
    );

    //
    // const newClient2 = new StreamChat(
    //   process.env.NEXT_PUBLIC_STREAM_API_KEY || ""
    // );
    // newClient2.connectUser(
    //   {
    //     id: "trey-anastasio",
    //     name: "Trey Anastasio",
    //   },
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidHJleS1hbmFzdGFzaW8ifQ.y5iiUhhjxNYqpIRVKLCJu_pM0TSLZp02ThLhk4ZGg90"
    // );
    // const channel = newClient.channel("messaging", {
    //   image: "man.png",
    //   name: "Trey Anastasio",
    //   members: ["devuser"],
    //   // option to add custom fields
    // });
    // const newchannel = newClient.channel("messaging", {
    //   image: "man.png",
    //   name: "Another channel 3",
    //   members: [chatUserId],
    // });
    // setChannel(newchannel);
    //

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
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
