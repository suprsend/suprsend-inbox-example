import { styled } from "styled-components";

const LightColors = {
  main: "#FFFFFF",
  primary: "#2E70E8",
  secondary: "#64748B",
  primaryText: "#1E293B",
  secondaryText: "#334155",
  border: "#DBDADA",
};

const DarkColors = {
  main: "#0F172A",
  primary: "#2E70E8",
  secondary: "#1E293B",
  primaryText: "#CBD5E1",
  secondaryText: "#94A3B8",
  border: "#334155",
};

const CustomLightColors = {
  backgroundColor: LightColors.main,
  bellColor: DarkColors.main,
  badgeColor: LightColors.primary,
  badgeTextColor: "#FFFFFF",
  border: LightColors.border,
  emptyTextColor: LightColors.primaryText,
  emptySubTextColor: LightColors.primaryText,
  headingTextColor: LightColors.primaryText,
  filterTextColor: LightColors.primaryText,
  filterTextHoverColor: "#F3F4F6",
  markAllReadTextColor: LightColors.primary,
  tabText: LightColors.primaryText,
  unselectedTabText: LightColors.secondary,
  selectedTabBottomColor: LightColors.primary,
  tabBadgeColor: LightColors.border,
  tabBadgeTextColor: LightColors.secondaryText,
  notificationReadBGColor: LightColors.main,
  notificationUnReadBGColor: "#EDF3FF",
  notificationReadHoverBGColor: "#F7F7F9",
  notificationUnReadHoverBGColor: "#DBE7FF",
  notificationHeaderTextColor: LightColors.primaryText,
  notificationBodyTextColor: LightColors.primaryText,
  notificationCreatedTextColor: LightColors.primaryText,
  notificationUnseenDotColor: LightColors.primary,
  notificationSubTextColor: LightColors.primaryText,
  primaryButtonBgColor: LightColors.primary,
  primaryButtonHoverBgColor: "#265cbf",
  primaryButtonTextColor: "#FFFFFF",
  secondaryButtonBgColor: LightColors.main,
  secondaryButtonHoverBgColor: "#F7F7F9",
  secondaryButtonTextColor: LightColors.secondaryText,
  loaderColor: LightColors.primary,
};

const CustomDarkColors = {
  backgroundColor: DarkColors.main,
  bellColor: LightColors.main,
  badgeColor: DarkColors.primary,
  badgeTextColor: "#FFFFFF",
  border: DarkColors.border,
  emptyTextColor: DarkColors.primaryText,
  emptySubTextColor: DarkColors.primaryText,
  headingTextColor: DarkColors.primaryText,
  filterTextColor: DarkColors.primaryText,
  filterTextHoverColor: "#334155",
  markAllReadTextColor: DarkColors.primary,
  selectedTabText: DarkColors.primaryText,
  unselectedTabText: DarkColors.secondaryText,
  selectedTabBottomColor: DarkColors.primary,
  tabBadgeColor: DarkColors.border,
  tabBadgeTextColor: DarkColors.secondaryText,
  notificationReadBGColor: DarkColors.main,
  notificationUnReadBGColor: "#1E293B",
  notificationReadHoverBGColor: "#0B1121",
  notificationUnReadHoverBGColor: "#192533",
  notificationHeaderTextColor: DarkColors.primaryText,
  notificationBodyTextColor: DarkColors.primaryText,
  notificationCreatedTextColor: DarkColors.primaryText,
  notificationUnseenDotColor: DarkColors.primary,
  notificationSubTextColor: DarkColors.primaryText,
  primaryButtonBgColor: DarkColors.primary,
  primaryButtonHoverBgColor: "#265cbf",
  primaryButtonTextColor: DarkColors.primaryText,
  secondaryButtonBgColor: DarkColors.main,
  secondaryButtonHoverBgColor: "#28374F",
  secondaryButtonTextColor: DarkColors.secondaryText,
  loaderColor: DarkColors.primary,
};

export function getStyles(theme) {
  return theme === "DARK" ? CustomDarkColors : CustomLightColors;
}

export const BaseText = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 20px;
  margin: 0px;
  padding: 0px;
`;
