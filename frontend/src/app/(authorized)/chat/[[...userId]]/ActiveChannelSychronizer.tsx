import { useCallback, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { toast } from "react-toastify";

import useChat from "@/hooks/useChat";

type ActiveChannelSychronizerProps = {
  initialConversationUserId: string | null;
};

const ActiveChannelSychronizer = ({
  initialConversationUserId,
}: ActiveChannelSychronizerProps) => {
  const { setActiveChannel, client } = useChatContext();
  const { synchronize } = useChat();

  const getConversationWithUser = useCallback(
    async (initialConversationUserId: string | null) => {
      if (!initialConversationUserId) return;

      //   TODO: add check whether initial covo user id exists
      synchronize(initialConversationUserId)
        .then(async () => {
          console.log("synchronized");

          const channel = client.channel("messaging", {
            members: [client.userID || "", initialConversationUserId], // TODO: maybe get that info from backend on synchronize? and make sure that the user with it exists – it could be also set properly in a preview (with data of the user)
          });
          await channel.watch();

          setActiveChannel(channel);
        })
        .catch(console.error);
    },
    [client]
  );

  useEffect(() => {
    getConversationWithUser(initialConversationUserId).catch((e) => {
      console.error("Failed to get conversation with user", e);
      toast.error("Failed to open conversation with that user");
    });
  }, [initialConversationUserId, getConversationWithUser]);

  return null;
};

export default ActiveChannelSychronizer;
