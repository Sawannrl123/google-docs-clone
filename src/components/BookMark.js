import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import localStorage from "../localStorage";

const BookMark = () => {
  const [bookMark, setBookMark] = useState(0);

  useEffect(() => {
    const getRating = async () => {
      const ls = localStorage();
      if (ls) {
        const bookmark = (await ls.getItem("documentBookMark")) || 0;
        setBookMark(bookmark);
      } else {
        console.log("Sorry! No Web Storage support..");
      }
    };
    getRating();
  }, []);

  return (
    <Rating
      name="size-small"
      value={bookMark}
      size="small"
      max={1}
      onChange={(event, newValue) => {
        setBookMark(newValue);
        localStorage().setItem("documentBookMark", newValue);
      }}
    />
  );
};

export default BookMark;
