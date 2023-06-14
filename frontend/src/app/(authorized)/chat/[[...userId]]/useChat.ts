import useUserWithRole from "@/hooks/useUserWithRole";
import { useCallback, useEffect, useState } from "react";

const useChat = () => {
  const [chatToken, setChatToken] = useState<string>("");
  const { idToken, user } = useUserWithRole();

  const getChatToken = useCallback(async () => {
    if (!idToken) return "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/get-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData.token;
  }, [idToken]);

  /**
   * Makes sure that the channel is created and filled with both user details
   *
   * @param initialConversationUserId
   * @throws {Error} if the channel could not be created due to an error
   * @return {boolean} if synchronization was successful
   */
  const synchronize = async (initialConversationUserId: string) => {
    if (!idToken) return false;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/sync?recipientId=${initialConversationUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message);
    }

    return true;
  };

  useEffect(() => {
    getChatToken()
      .then((token) => setChatToken(token))
      .catch(console.error);
  }, [getChatToken]);

  return {
    chatToken,
    userId: user?.uid,
    username: user?.displayName,
    synchronize,
  };
};

export default useChat;
