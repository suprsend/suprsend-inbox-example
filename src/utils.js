import { useState, useEffect, useRef } from "react";

export const markdownCustomStyleRenderer = {
  link(href, title, text) {
    return `<a href=${href} title=${title} style="color:#066AF3;text-decoration:none;white-space:normal;">${text}</a>`;
  },
  list(body, ordered) {
    if (ordered) {
      return `<ol style="list-style:revert;white-space:normal;margin:0px;padding-left:15px;">${body}</ol>`;
    } else {
      return `<ul style="list-style:revert;white-space:normal;margin:0px;padding-left:15px;">${body}</ul>`;
    }
  },
  paragraph(text) {
    return `<p style="white-space:pre-line">${text}</p>`;
  },
  blockquote(src) {
    return `<blockquote style="margin:0px;padding-left:10px;border-left:2px #DBDADA solid;margin-top:5px; margin-bottom:5px;">${src}</blockquote>`;
  },
};

export const useClickOutside = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, open, setOpen };
};

export const LIGHT_THEME_STYLES = {
  backgroundColor: "#FFFFFF",
  headerBackgroundColor: "#FFFFFF",
  headerTextColor: "#1E293B",
  headerMarkAllColor: "#2E70E8",
  selectedTabTextColor: "#1E293B",
  selectedTabBottomBorderColor: "#2E70E8",
  unSelectedTabText: "#64748B",
  unReadCounterText: "#334155",
  unReadCounterBackground: "#F2F4F7",
  bellIconColor: "#1E293B",
  counterTextColor: "#FFFFFF",
  counterBackgroundColor: "#2E70E8",
  cardBodyText: "#334155",
  cardBodySubText: "#64748B",
  cardUnReadStateBgColor: "#EDF3FF",
  cardUnreadStateUnreadDotColor: "#2E70E8",
  cardReadStateBgColor: "#FFFFFF",
  primaryButtonBgColor: "#2E70E8",
  primaryButtonTextColor: "#FFFFFF",
  secondaryButtonBgColor: "#FFFFFF",
  secondaryButtonTextColor: "#475569",
  showToast: true,
  toastBgColor: "#FFFFFF",
  toastTextColor: "#1E293B",
};

export const DARK_THEME_STYLES = {
  backgroundColor: "#0F172A",
  headerBackgroundColor: "#0F172A",
  headerTextColor: "#FFFFFF",
  headerMarkAllColor: "#2E70E8",
  selectedTabTextColor: "#FFFFFF",
  selectedTabBottomBorderColor: "#2E70E8",
  unSelectedTabText: "#94A3B8",
  unReadCounterText: "#FFFFFF",
  unReadCounterBackground: "#64748B",
  bellIconColor: "#FFFFFF",
  counterTextColor: "#FFFFFF",
  counterBackgroundColor: "#2E70E8",
  cardBodyText: "#CBD5E1",
  cardBodySubText: "#CBD5E1",
  cardUnReadStateBgColor: "#1E293B",
  cardUnreadStateUnreadDotColor: "#2E70E8",
  cardReadStateBgColor: "#0F172A",
  primaryButtonBgColor: "#2E70E8",
  primaryButtonTextColor: "#FFFFFF",
  secondaryButtonBgColor: "#FFFFFF",
  secondaryButtonTextColor: "#E2E8F0",
  showToast: true,
  toastBgColor: "#FFFFFF",
  toastTextColor: "#1E293B",
};
