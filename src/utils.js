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
