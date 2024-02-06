import { useState, useEffect, useContext } from "react";
import { useNotifications, useStoresUnseenCount } from "@suprsend/react-inbox";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import NotificationCard from "./NotificationCard";
import { BaseText } from "../styles";
import { useClickOutside } from "../utils";
import SettingsSVG from "../assets/settingsIcon.svg?react";
import FilterSVG from "../assets/filterIcon.svg?react";
import TickSVG from "../assets/tick.svg?react";
import EmptyNotificationsIcon from "../assets/emptyNotificationsIcon.svg?react";
import { InboxContext } from "../App";

const FILTER_OPTIONS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Read",
    value: "READ",
  },
  {
    label: "Unread",
    value: "UNREAD",
  },
];

function NotificationHeader({
  activeTab,
  setActiveTab,
  activeFilter,
  setActiveFilter,
  setChangeTab,
  markAllRead,
  stores,
  unseenData,
  styles,
}) {
  const {
    ref,
    open: showFilterMenu,
    setOpen: setShowFilterMenu,
  } = useClickOutside(false);

  return (
    <HeaderContainer
      style={{
        borderBottomColor: styles.border,
        backgroundColor: styles.backgroundColor,
      }}
    >
      <HeadingView>
        <LeftView>
          <HeadingText style={{ color: styles.headingTextColor }}>
            Notifications
          </HeadingText>
          <div ref={ref}>
            <FilterIcon
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
              }}
            />
            {showFilterMenu && (
              <FiltersContainer
                style={{
                  borderColor: styles.border,
                  backgroundColor: styles.backgroundColor,
                }}
              >
                {FILTER_OPTIONS?.map((option) => {
                  return (
                    <FilterItem
                      style={{ color: styles.filterTextColor }}
                      hoverBGColor={styles.filterTextHoverColor}
                      key={option.value}
                      onClick={() => {
                        setActiveFilter(option.value);
                        setShowFilterMenu(false);
                      }}
                    >
                      {option.label}
                      {option?.value === activeFilter && <TickIcon />}
                    </FilterItem>
                  );
                })}
              </FiltersContainer>
            )}
          </div>
        </LeftView>
        <RightView>
          <MarkAllReadText
            onClick={markAllRead}
            style={{ color: styles.markAllReadTextColor }}
          >
            Mark all as read
          </MarkAllReadText>
          <SettingsLink
            href="https://www.suprsend.com/products/app-inbox"
            target="_blank"
            rel="noreferrer"
          >
            <SettingsIcon />
          </SettingsLink>
        </RightView>
      </HeadingView>

      <TabsView>
        {stores?.map((store, index) => {
          const isActiveTab = activeTab === store.storeId;
          const tabUnseenCount = unseenData?.[store.storeId] || 0;
          const showBadge = tabUnseenCount > 0;

          return (
            <TabContainer
              key={index}
              onClick={() => {
                setChangeTab(true);
                setActiveTab(store.storeId);
                setTimeout(() => {
                  setChangeTab(false);
                }, 0);
              }}
            >
              <TabView>
                <TabText
                  style={{
                    color: isActiveTab
                      ? styles.selectedTabText
                      : styles.unselectedTabText,
                  }}
                >
                  {store.label}
                </TabText>
                {showBadge && (
                  <TabBadge style={{ backgroundColor: styles.tabBadgeColor }}>
                    <TabBadgeText
                      count={tabUnseenCount}
                      style={{ color: styles.tabBadgeTextColor }}
                    >
                      {tabUnseenCount}
                    </TabBadgeText>
                  </TabBadge>
                )}
              </TabView>
              {isActiveTab && (
                <TabBottomBorder
                  style={{ backgroundColor: styles.selectedTabBottomColor }}
                />
              )}
            </TabContainer>
          );
        })}
      </TabsView>
    </HeaderContainer>
  );
}

export default function NotificationsContainer() {
  const { styles, stores } = useContext(InboxContext);

  const [activeFilter, setActiveFilter] = useState("ALL"); //store selected filter type
  const [changeTab, setChangeTab] = useState(false); // this dummy state is needed for infinite-scroll component to work properly on tab change

  const filteredStores = stores?.filter((store) => {
    if (activeFilter === "ALL") {
      return [undefined, null].includes(store?.query?.read);
    } else if (activeFilter === "READ") {
      return store?.query?.read === true;
    } else if (activeFilter === "UNREAD") {
      return store?.query?.read === false;
    }
    return [];
  });

  // store selected tab id
  const [activeTab, setActiveTab] = useState(() =>
    filteredStores && Array.isArray(filteredStores) && filteredStores.length > 0
      ? filteredStores[0].storeId
      : null
  );

  useEffect(() => {
    setActiveTab(filteredStores[0].storeId);
  }, [activeFilter]);

  const {
    notifications,
    hasNext,
    initialLoading,
    markAllRead,
    markClicked,
    fetchPrevious,
  } = useNotifications(activeTab);

  const unseenData = useStoresUnseenCount();

  let status;
  if (initialLoading) {
    status = "LOADING_VIEW";
  } else if (notifications?.length < 1) {
    status = "NO_NOTIFICATIONS_VIEW";
  } else {
    status = "NOTIFICATIONS_VIEW";
  }

  return (
    <>
      <NotificationHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setChangeTab={setChangeTab}
        markAllRead={markAllRead}
        stores={filteredStores}
        unseenData={unseenData}
        styles={styles}
      />
      {status === "LOADING_VIEW" && (
        <LoaderContainer>
          <Loader size="large" styles={styles} />
        </LoaderContainer>
      )}
      {status === "NO_NOTIFICATIONS_VIEW" && (
        <EmptyContainer>
          <EmptyNotificationsIcon />
          <EmptyText style={{ color: styles.emptyTextColor }}>
            No notifications yet
          </EmptyText>
          <EmptySubText style={{ color: styles.emptySubTextColor }}>
            We will let you know when we have something new for you.
          </EmptySubText>
        </EmptyContainer>
      )}
      {status === "NOTIFICATIONS_VIEW" && (
        <>
          {changeTab ? null : (
            <InfiniteScroll
              scrollableTarget="ss-notification-container"
              dataLength={notifications.length}
              next={fetchPrevious}
              hasMore={hasNext}
              loader={<Loader styles={styles} />}
            >
              {notifications.map((notification) => {
                return (
                  <NotificationCard
                    notificationData={notification}
                    key={notification.n_id}
                    markClicked={markClicked}
                  />
                );
              })}
            </InfiniteScroll>
          )}
        </>
      )}
    </>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 0.5px solid;
`;

const HeadingView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftView = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 12px;
`;

const HeadingText = styled(BaseText)`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const FilterIcon = styled(FilterSVG)`
  cursor: pointer;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 22%;
  position: absolute;
  margin-right: 36px;
  transform-origin: top;
  margin-top: 4px;
  border-radius: 6px;
  border: 1px solid;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

const FilterItem = styled(BaseText)`
  cursor: pointer;
  padding: 8px 16px 8px 16px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ hoverBGColor }) => hoverBGColor}
`;

const TickIcon = styled(TickSVG)`
  margin-left: auto;
  margin-top: 2px;
`;

const RightView = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MarkAllReadText = styled(BaseText)`
  font-weight: 500;
  cursor: pointer;
`;

const SettingsLink = styled.a`
  margin-left: 6px;
  cursor: pointer;
`;

const SettingsIcon = styled(SettingsSVG)`
  margin-bottom: -2px;
`;

const TabsView = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabContainer = styled.div`
  cursor: pointer;
`;

const TabView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px 8px 16px;
`;

const TabText = styled(BaseText)`
  font-weight: 500;
`;

const TabBadge = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`;

const TabBadgeText = styled(BaseText)`
  font-size: ${(props) => {
    return props?.count > 99 ? "8px" : "10px";
  }};
  font-weight: 700;
  line-height: 1;
`;

const TabBottomBorder = styled.div`
  height: 3px;
  wth: id 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const LoaderContainer = styled.div`
  margin-top: 24px;
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 60px 12px 0px 12px;
`;

const EmptyText = styled(BaseText)`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  padding-top: 12px;
`;

const EmptySubText = styled(BaseText)`
  text-align: center;
`;
