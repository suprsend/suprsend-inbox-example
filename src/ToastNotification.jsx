import { useContext } from "react";
import { styled } from "styled-components";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { InboxContext } from "./App";
import DefaultAvatarIcon from "./assets/defaultAvatarIcon.png";
import { BaseText } from "./styles";

export default function ToastNotification({ data }) {
  const { styles } = useContext(InboxContext);

  const notification = data?.message;

  return (
    <ToastNotificationView style={{ backgroundColor: styles.backgroundColor }}>
      <div>
        {notification?.avatar?.avatar_url ? (
          <ToastImage
            src={notification.avatar.avatar_url}
            alt="avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultAvatarIcon;
            }}
          />
        ) : (
          <ToastImage src={DefaultAvatarIcon} alt="avatar" />
        )}
      </div>
      <div>
        {notification?.header && (
          <ToastHeader
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(notification?.header)),
            }}
            style={{ color: styles.notificationHeaderTextColor }}
          />
        )}
        {notification?.text && (
          <ToastBody
            header={notification?.header}
            style={{ color: styles.notificationBodyTextColor }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(notification?.text)),
            }}
          />
        )}
      </div>
    </ToastNotificationView>
  );
}

const ToastNotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-height: 100px;
  overflow: scroll;
`;

const ToastImage = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;

const ToastHeader = styled(BaseText)`
  font-weight: 600;
  margin-left: 8px;
  overflow-wrap: anywhere;
  margin-top: -12px;
`;

const ToastBody = styled(ToastHeader)`
  font-weight: 500;
  margin-top: ${({ header }) => (!header ? "-12px" : "8px")};
`;
