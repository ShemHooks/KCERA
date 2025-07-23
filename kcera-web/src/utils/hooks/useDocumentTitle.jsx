import { useEffect } from "react";

export const GetDocTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};
