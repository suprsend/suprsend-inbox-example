import { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { marked } from "marked";
import DOMPurify from "dompurify";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { InboxContext } from "../App.jsx";
import { markdownCustomStyleRenderer } from "../utils.js";
import DefaultAvatarIcon from "../assets/defaultAvatarIcon.png";
import { BaseText } from "../styles.js";

marked.use({ renderer: markdownCustomStyleRenderer });

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    past: "%ss",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default function Notification({ notificationData, markClicked }) {
  const { styles } = useContext(InboxContext);

  const { message, seen_on: seenOn, created_on: createdOn } = notificationData;

  const actionOne = message?.actions?.[0];
  const actionTwo = message?.actions?.[1];
  const hasButtons = actionOne || actionTwo;

  const handleActionClick = (url) => {
    if (!notificationData.interacted_on) {
      markClicked(notificationData.n_id);
      if (url) {
        setTimeout(() => {
          window.open(url, "_blank");
        }, 1000);
      }
    } else {
      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <Container
      style={{
        backgroundColor: seenOn
          ? styles.notificationReadBGColor
          : styles.notificationUnReadBGColor,
        borderBottomColor: styles.border,
      }}
      hoverColor={
        seenOn
          ? styles.notificationReadHoverBGColor
          : styles.notificationUnReadHoverBGColor
      }
      onClick={(e) => {
        e.stopPropagation();
        handleActionClick(message?.url);
      }}
    >
      <NotificationView>
        <LeftView>
          <AvatarView
            onClick={(e) => {
              e.stopPropagation();
              const actionUrl = message?.avatar?.action_url || message?.url;
              handleActionClick(actionUrl);
            }}
          >
            {message?.avatar?.avatar_url ? (
              <AvatarImage
                src={message.avatar.avatar_url}
                alt="avatar"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = DefaultAvatarIcon;
                }}
              />
            ) : (
              <DefaultAvatarImage
                src={DefaultAvatarIcon}
                alt="default_avatar"
              />
            )}
          </AvatarView>

          <div>
            {message.header && (
              <HeaderText
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked(message.header)),
                }}
                style={{ color: styles.notificationHeaderTextColor }}
              />
            )}
            {message?.text && (
              <BodyText
                header={message.header}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked(message?.text)),
                }}
                style={{ color: styles.notificationBodyTextColor }}
              />
            )}
          </div>
        </LeftView>
        <RightView>
          <CreatedText style={{ color: styles.notificationCreatedTextColor }}>
            {dayjs(createdOn).fromNow(true)}
          </CreatedText>
          {!seenOn && (
            <div>
              <UnseenDot
                style={{ backgroundColor: styles.notificationUnseenDotColor }}
              />
            </div>
          )}
        </RightView>
      </NotificationView>

      {/* sub text */}
      {message?.subtext?.text && (
        <SubTextView
          link={message?.subtext?.action_url}
          hoverColor={styles.notificationSubTextColor}
          onClick={(e) => {
            e.stopPropagation();
            const actionUrl = message?.subtext?.action_url || message?.url;
            handleActionClick(actionUrl);
          }}
        >
          <SubText style={{ color: styles.notificationSubTextColor }}>
            {message.subtext.text}
          </SubText>
        </SubTextView>
      )}
      {hasButtons && (
        <ButtonContainer>
          {/* primary action button */}
          {actionOne && (
            <ButtonView
              key={actionOne.id}
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(actionOne.url);
              }}
              style={{ backgroundColor: styles.primaryButtonBgColor }}
              hoverBgColor={styles.primaryButtonHoverBgColor}
            >
              <ButtonText style={{ color: styles.primaryButtonTextColor }}>
                {actionOne.name}
              </ButtonText>
            </ButtonView>
          )}

          {/* secondary action button */}
          {actionTwo && (
            <ButtonOutlineView
              style={{
                backgroundColor: styles.secondaryButtonBgColor,
                borderColor: styles.border,
              }}
              hoverBgColor={styles.secondaryButtonHoverBgColor}
              key={actionTwo.id}
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(actionTwo.url);
              }}
            >
              <ButtonText style={{ color: styles.secondaryButtonTextColor }}>
                {actionTwo.name}
              </ButtonText>
            </ButtonOutlineView>
          )}
        </ButtonContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 20px 16px 20px;
  cursor: pointer;
  border-bottom: 0.5px solid;
  &:hover {
    background-color: ${({ hoverColor }) => {
      return hoverColor;
    }} !important;
  }
`;

const NotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const LeftView = styled.div`
  display: flex;
  margin-right: 12px;
  overflow-wrap: anywhere;
`;

const AvatarView = styled.div`
  margin-top: 10px;
  margin-right: 12px;
`;

const AvatarImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100px;
`;

const DefaultAvatarImage = styled.img`
  height: 40px;
  width: 40px;
`;

const HeaderText = styled(BaseText)`
  overflow-wrap: anywhere;
  line-height: 16px;
  font-weight: 600;
`;

const BodyText = styled(BaseText)`
  margin-top: ${({ header }) => (header ? "-6px" : "0px")};
  margin-bottom: -6px;
  box-sizing: border-box;
`;

const RightView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

const CreatedText = styled(BaseText)`
  font-size: 12px;
  color: ${({ isDarkTheme }) => (isDarkTheme ? "#94A3B8" : "#475569")};
  font-weight: 400;
  margin-top: 4px;
`;

const UnseenDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 10px;
`;

const SubTextView = styled.div`
  text-decoration: none;
  margin-left: 10px;
  margin-bottom: 8px;
  overflow-wrap: anywhere;
  &:hover {
    text-decoration: ${({ link }) => (link ? "underline" : "none")};
    text-decoration-color: ${({ hoverColor }) => hoverColor};
  }
`;

const SubText = styled(BaseText)`
  font-size: 11px;
  margin-left: 42px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
  margin-left: 50px;
  overflow-wrap: anywhere;
`;

const ButtonView = styled.button`
  max-width: 50%;
  border-radius: 5px;
  text-decoration: none;
  padding: 6px 16px;
  border: 0px;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor} !important;
  }
`;

const ButtonText = styled(BaseText)`
  text-align: center;
  word-break: break-all;
  font-weight: 500;
  line-height: 18px;
`;

const ButtonOutlineView = styled(ButtonView)`
  border: 1px solid;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor} !important;
  }
`;
