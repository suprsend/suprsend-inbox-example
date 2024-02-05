import { useState, createContext } from "react";
import { SuprSendProvider } from "@suprsend/react-inbox";
import { getStyles } from "./styles";
import PopUpInbox from "./PopUpInbox";
import SideSheet from "./SideSheetInbox";
import FullScreenInbox from "./FullScreenInbox";

const stores = [
  { storeId: "ALL", label: "All" },
  { storeId: "ALL_READ", label: "All", query: { read: true } },
  { storeId: "ALL_UN_READ", label: "All", query: { read: false } },
  { storeId: "MENTIONS", label: "Mentions", query: { tags: "mentions" } },
  {
    storeId: "MENTIONS_READ",
    label: "Mentions",
    query: { tags: "mentions", read: true },
  },
  {
    storeId: "MENTIONS_UN_READ",
    label: "Mentions",
    query: { tags: "mentions", read: false },
  },
  { storeId: "REPLIES", label: "Replies", query: { tags: "replies" } },
  {
    storeId: "REPLIES_READ",
    label: "Replies",
    query: { tags: "replies", read: true },
  },
  {
    storeId: "REPLIES_UN_READ",
    label: "Replies",
    query: { tags: "replies", read: false },
  },
];

const Themes = { DARK: "DARK", LIGHT: "LIGHT" };

export const InboxContext = createContext({});

export default function App() {
  const [theme] = useState(Themes.LIGHT);

  return (
    <InboxContext.Provider value={{ theme, stores, styles: getStyles(theme) }}>
      <SuprSendProvider
        workspaceKey={"lap5NefpkeN4gKyi8CiM"}
        subscriberId={"jI9WO0Qs3g1IcByQitm1BpyMB_AHPI8_jREYaKgwvRo"}
        distinctId={"katta.sivaram@suprsend.com"}
        stores={stores}
      >
        <div style={{ margin: "20px 500px" }}>
          <PopUpInbox />
        </div>
        {/* <SideSheet /> */}
        {/* <FullScreenInbox /> */}
      </SuprSendProvider>
    </InboxContext.Provider>
  );
}
