/**
 * Code adapted from demo
 * @link https://github.com/GetStream/website-react-examples/blob/master/social-messenger-ts/src/components/MessagingChannelPreview/MessagingChannelPreview.tsx
 */
import { Channel, ChannelMemberResponse } from "stream-chat";
import {
  ChannelPreviewUIComponentProps,
  ChatContextValue,
  useChatContext,
  Avatar,
} from "stream-chat-react";

const getTimeStamp = (channel: Channel) => {
  let lastHours = channel.state.last_message_at?.getHours();
  let lastMinutes: string | number | undefined =
    channel.state.last_message_at?.getMinutes();
  let half = "AM";

  if (lastHours === undefined || lastMinutes === undefined) {
    return "";
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12;
    half = "PM";
  }

  if (lastHours === 0) lastHours = 12;
  if (lastHours === 12) half = "PM";

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`;
  }

  return `${lastHours}:${lastMinutes} ${half}`;
};

const getChannelName = (members: ChannelMemberResponse[]) => {
  const defaultName = "Conversation";
  return members[0]?.user?.name || defaultName;
};

type MessagingChannelPreviewProps = ChannelPreviewUIComponentProps & {
  channel: Channel;
  setActiveChannel?: ChatContextValue["setActiveChannel"];
};

const CustomChannelPreview = (props: MessagingChannelPreviewProps) => {
  const { channel, lastMessage, setActiveChannel } = props;
  const { channel: activeChannel, client } = useChatContext();

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID
  );

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__container selected"
          : "channel-preview__container"
      }
      onClick={() => {
        setActiveChannel?.(channel);
      }}
    >
      <Avatar image={"/man.png"} size={40} />
      <div className="channel-preview__content-wrapper">
        <div className="channel-preview__content-top">
          <p className="channel-preview__content-name">
            {channel.data?.name || getChannelName(members)}
          </p>
          <p className="channel-preview__content-time">
            {getTimeStamp(channel)}
          </p>
        </div>
        <p className="channel-preview__content-message">
          {lastMessage?.text ?? "Send a message"}
        </p>
      </div>
    </div>
  );
};

export default CustomChannelPreview;
