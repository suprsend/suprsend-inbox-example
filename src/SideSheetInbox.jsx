import { useContext } from "react";
import styled from "styled-components";
import { InboxContext } from "./App";
import NotificationsContainer from "./components/NotificationsContainer";

export default function SideSheetInbox() {
  const { styles, theme } = useContext(InboxContext);

  return (
    <Container theme={theme}>
      <SideSheetContainer
        id="ss-notification-container"
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <NotificationsContainer />
      </SideSheetContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: ${({ theme }) =>
    theme === "DARK" ? "#182338" : "#9ca3af"};
`;

const SideSheetContainer = styled.div`
  width: 45%;
  height: 100vh;
  overflow: scroll;
`;
