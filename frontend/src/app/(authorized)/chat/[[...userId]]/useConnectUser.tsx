/**
 * Modified code from the demo
 * @link https://github.com/GetStream/website-react-examples/blob/master/social-messenger-ts/src/hooks/useConnectUser.ts
 */

import useChat from "./useChat";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StreamChat } from "stream-chat";

const useConnectUser = () => {
  const { chatToken, userId: chatUserId, username } = useChat();
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!chatToken || !chatUserId) return;

    const newClient = new StreamChat(
      process.env.NEXT_PUBLIC_STREAM_API_KEY ?? ""
    );

    // Under some circumstances, a "connectUser" operation might be interrupted
    // (fast user switching, react strict-mode in dev). With this flag, we control
    // whether a "disconnectUser" operation has been requested before we
    // provide a new StreamChat instance to the consumers of this hook.
    let didUserConnectInterrupt = false;
    const connectUser = newClient
      .connectUser(
        {
          id: chatUserId,
          name: username || "Anonymous",
        },
        chatToken
      )
      .catch((e) => {
        console.error("Failed to connect user", e);
        toast.error("Failed to connect user");
      })
      .then(() => {
        if (!didUserConnectInterrupt) {
          setClient(newClient);
        }
      });

    return () => {
      didUserConnectInterrupt = true;
      // there might be a pending "connectUser" operation, wait for it to finish
      // before executing the "disconnectUser" in order to prevent race-conditions.
      connectUser
        .then(() => {
          setClient(null);
          newClient.disconnectUser().catch((e) => {
            toast.error("Failed to disconnect user");
            console.error("Failed to disconnect user", e);
          });
        })
        .catch(console.error);
    };
  }, [chatToken, chatUserId, username]);

  return { client, chatUserId, chatToken };
};

export default useConnectUser;
