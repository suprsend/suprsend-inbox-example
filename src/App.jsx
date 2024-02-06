import { useState, createContext, useContext } from "react";
import { SuprSendProvider, useEvent } from "@suprsend/react-inbox";
import { ToastContainer, toast } from "react-toastify";
import { getStyles } from "./styles";
import PopUpInbox from "./PopUpInbox";
import SideSheetInbox from "./SideSheetInbox";
import FullScreenInbox from "./FullScreenInbox";
import ToastNotification from "./ToastNotification";
import "react-toastify/dist/ReactToastify.css";

// define all stores. If you are using filter you have to define combination of all filters
const stores = [
  { storeId: "ALL", label: "All" },
  { storeId: "ALL_READ", label: "All", query: { read: true } },
  { storeId: "ALL_UNREAD", label: "All", query: { read: false } },
  // -------
  { storeId: "MENTIONS", label: "Mentions", query: { tags: "mentions" } },
  {
    storeId: "MENTIONS_READ",
    label: "Mentions",
    query: { tags: "mentions", read: true },
  },
  {
    storeId: "MENTIONS_UNREAD",
    label: "Mentions",
    query: { tags: "mentions", read: false },
  },
  //---------
  { storeId: "REPLIES", label: "Replies", query: { tags: "replies" } },
  {
    storeId: "REPLIES_READ",
    label: "Replies",
    query: { tags: "replies", read: true },
  },
  {
    storeId: "REPLIES_UNREAD",
    label: "Replies",
    query: { tags: "replies", read: false },
  },
];

const Themes = { DARK: "DARK", LIGHT: "LIGHT" };

export const InboxContext = createContext({});

export default function App() {
  const [theme] = useState(Themes.LIGHT); // change theme: Themes.DARK or Themes.LIGHT

  return (
    <InboxContext.Provider value={{ theme, stores, styles: getStyles(theme) }}>
      <SuprSendProvider
        workspaceKey={import.meta.env.VITE_WORKSPACE_KEY}
        distinctId={import.meta.env.VITE_DISTINCT_ID}
        subscriberId={import.meta.env.VITE_SUBSCRIBER_ID}
        stores={stores}
      >
        <InboxTypes />
      </SuprSendProvider>
    </InboxContext.Provider>
  );
}

function InboxTypes() {
  const { theme } = useContext(InboxContext);

  // remove this if toast notification is not needed
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

  // uncomment inbox type you want to use
  return (
    <>
      <div
        style={{
          padding: "20px 500px",
          backgroundColor: theme === "DARK" ? "black" : "white",
        }}
      >
        <PopUpInbox />
      </div>

      {/* <SideSheetInbox /> */}

      {/* <FullScreenInbox /> */}
      <ToastContainer />
    </>
  );
}
