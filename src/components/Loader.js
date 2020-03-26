import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff"
  }
}));

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box className={classes.root}>
        <CircularProgress />
      </Box>
    );
  }
  return null;
};

export default Loader;
