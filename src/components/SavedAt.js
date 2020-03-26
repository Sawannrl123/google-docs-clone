import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import localStorage from "../localStorage";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const useStyles = makeStyles(theme => ({
  link: {
    fontSize: 15,
    color: "rgba(0, 0, 0, .54)",
    position: "absolute",
    zIndex: 2,
    top: 38,
    left: 450,
    textDecoration: "underline"
  }
}));

const SavedAt = () => {
  const [savedAt, setSavedAt] = useState(null);
  const classes = useStyles();

  function formatAMPM() {
    const date = new Date(savedAt);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function getDay() {
    const date = new Date(savedAt);
    const now = new Date();
    const yearDate = date.getFullYear();
    const monthDate = date.getMonth();
    const dayDate = date.getDate();
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dayNow = now.getDate();
    console.log({
      date,
      now,
      yearDate,
      monthDate,
      dayDate,
      yearNow,
      monthNow,
      dayNow
    });
    if (yearDate === yearNow && monthDate === monthNow && dayDate === dayNow) {
      return "All changes saved in Drive";
    }
    return `Last edit was on ${dayDate}-${
      monthNames[monthDate]
    }-${yearDate} at ${formatAMPM()}`;
  }

  useEffect(() => {
    const getSavedAt = async () => {
      const ls = localStorage();
      if (ls) {
        const saved = (await ls.getItem("savedAt")) || null;

        setSavedAt(saved);
      } else {
        console.log("Sorry! No Web Storage support..");
      }
    };
    getSavedAt();
  });

  if (savedAt) {
    return (
      <Link href="/" className={classes.link} onClick={e => e.preventDefault()}>
        {getDay()}
      </Link>
    );
  }

  return null;
};

export default SavedAt;
