import { useContext } from "react";
import { styled } from "styled-components";
import { InboxContext } from "./App";
import NotificationsContainer from "./components/NotificationsContainer";

export default function FullScreenInbox() {
  const { styles } = useContext(InboxContext);

  return (
    <FullScreenContainer style={{ backgroundColor: styles.backgroundColor }}>
      <NotificationsContainer />
    </FullScreenContainer>
  );
}

const FullScreenContainer = styled.div`
  height: 100vh;
`;
