import { useContext } from "react";
import { useUnseenCount } from "@suprsend/react-inbox";
import styled from "styled-components";
import { InboxContext } from "./App";
import { useClickOutside } from "./utils";
import NotificationsContainer from "./components/NotificationsContainer";
import BellSVG from "./assets/bellIcon.svg?react";
import { BaseText } from "./styles";

export default function PopUpInbox() {
  const { styles } = useContext(InboxContext);
  const { unSeenCount, markAllSeen } = useUnseenCount();

  const {
    ref,
    open: showNotifications,
    setOpen: setShowNotifications,
  } = useClickOutside(); // hook to close popup on clicking outside

  const handleBellClick = () => {
    if (!showNotifications) {
      markAllSeen();
    }
    setShowNotifications((prev) => !prev);
  };

  return (
    <Container ref={ref}>
      <BellContainer onClick={handleBellClick}>
        <BadgeView style={{ backgroundColor: styles.badgeColor }}>
          <BadgeText style={{ color: styles.badgeTextColor }}>
            {unSeenCount}
          </BadgeText>
        </BadgeView>
        <BellIcon style={{ stroke: styles.bellColor }} />
      </BellContainer>
      {showNotifications && (
        <PopUpNotifContainer
          id="ss-notification-container" // id is needed for infinite scroll fetch more
          style={{
            backgroundColor: styles.backgroundColor,
            borderColor: styles.border,
          }}
        >
          <NotificationsContainer />
        </PopUpNotifContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 30px;
  width: 30px;
  position: relative;
`;

const BellContainer = styled.div`
  cursor: pointer;
`;

const BadgeView = styled.div`
  width: 18px;
  height: 18px;
  position: absolute;
  border-radius: 50%;
  margin-left: 10px;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled(BaseText)`
  font-size: 10px;
`;

const BellIcon = styled(BellSVG)`
  height: 24px;
  width: 24px;
  fill: transparent;
`;

const PopUpNotifContainer = styled.div`
  width: 450px;
  height: 500px;
  overflow: scroll;
  position: absolute;
  background: white;
  right: -20px;
  border-radius: 8px;
  border: 1px solid;
  box-shadow: 0px 3px 3px 0px rgba(2, 6, 23, 0.03),
    0px 10px 24px 0px rgba(2, 6, 23, 0.08);
`;
