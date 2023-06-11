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

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const App = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const newClient = new StreamChat(
      process.env.NEXT_PUBLIC_STREAM_API_KEY || ""
    );

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: "devuser",
        name: "Dave Matthews",
      },
      process.env.NEXT_PUBLIC_USER_TOKEN
    );

    //
    const newClient2 = new StreamChat(
      process.env.NEXT_PUBLIC_STREAM_API_KEY || ""
    );
    newClient2.connectUser(
      {
        id: "trey-anastasio",
        name: "Trey Anastasio",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidHJleS1hbmFzdGFzaW8ifQ.y5iiUhhjxNYqpIRVKLCJu_pM0TSLZp02ThLhk4ZGg90"
    );
    const channel = newClient.channel("messaging", {
      image: "man.png",
      name: "Create a Messaging Channel",
      members: ["devuser", "trey-anastasio"],
      // option to add custom fields
    });
    newClient.channel("messaging", {
      image: "man.png",
      name: "Another channel",
      members: ["devuser", "trey-anastasio"],
      // option to add custom fields
    });
    setChannel(channel);
    //

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
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
