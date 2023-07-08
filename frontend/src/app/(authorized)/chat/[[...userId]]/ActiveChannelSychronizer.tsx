import { useCallback, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { toast } from "react-toastify";

import useChat from "./useChat";
import useUserWithRole from "@/hooks/useUserWithRole";

type ActiveChannelSychronizerProps = {
  initialConversationUserId: string | null;
};

const ActiveChannelSychronizer = ({
  initialConversationUserId,
}: ActiveChannelSychronizerProps) => {
  const { setActiveChannel, client } = useChatContext();
  const { idToken } = useUserWithRole();
  const { synchronize } = useChat();

  const getConversationWithUser = useCallback(
    async (initialConversationUserId: string | null) => {
      if (!initialConversationUserId) return;

      synchronize(initialConversationUserId)
        .then(async (isSynchronized) => {
          if (!isSynchronized) return;

          const channel = client.channel("messaging", {
            members: [client.userID ?? "", initialConversationUserId],
          });
          await channel.watch();

          setActiveChannel(channel);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Could not create conversation with that user");
        });
    },
    [client, idToken]
  );

  useEffect(() => {
    getConversationWithUser(initialConversationUserId).catch((e) => {
      console.error("Failed to get conversation with user", e);
      toast.error("Failed to open conversation with that user");
    });
  }, [initialConversationUserId, getConversationWithUser, idToken]);

  return null;
};

export default ActiveChannelSychronizer;
