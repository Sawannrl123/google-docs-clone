import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import localStorage from "../localStorage";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "auto",
    padding: 4,
    color: props => (props.bookMark ? "#F4B400" : "#5f6368")
  },
  icon: {
    fontSize: 18
  }
}));

const BookMark = () => {
  const [bookMark, setBookMark] = useState(0);
  const classes = useStyles({ bookMark });

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
    <Button
      aria-label="Bookmark"
      onClick={() => {
        setBookMark(!bookMark);
        localStorage().setItem("documentBookMark", !bookMark);
      }}
      className={classes.root}
    >
      {bookMark ? (
        <StarIcon className={classes.icon} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}
    </Button>
  );
};

export default BookMark;
