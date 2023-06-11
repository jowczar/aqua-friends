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

  useEffect(() => {
    getChatToken().then((token) => setChatToken(token));
  }, [getChatToken]);

  return { chatToken, userId: user?.uid, username: user?.displayName };
};

export default useChat;
