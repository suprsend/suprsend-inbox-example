import { useState, createContext, useContext } from "react";
import { SuprSendProvider, useEvent } from "@suprsend/react-inbox";
import { ToastContainer, toast } from "react-toastify";
import { getStyles } from "./styles";
import PopUpInbox from "./PopUpInbox";
import SideSheet from "./SideSheetInbox";
import FullScreenInbox from "./FullScreenInbox";
import ToastNotification from "./ToastNotification";
import "react-toastify/dist/ReactToastify.css";

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
        <InboxTypes />
      </SuprSendProvider>
    </InboxContext.Provider>
  );
}

function InboxTypes() {
  const { theme } = useContext(InboxContext);

  useEvent("new_notification", (data) => {
    toast(() => <ToastNotification data={data} />, {
      icon: false,
      type: "success",
      theme: theme === "DARK" ? "dark" : "light",
      closeOnClick: true,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  });

  return (
    <>
      <div style={{ margin: "20px 500px" }}>
        <PopUpInbox />
      </div>
      {/* <SideSheet /> */}
      {/* <FullScreenInbox /> */}
      <ToastContainer />
    </>
  );
}
