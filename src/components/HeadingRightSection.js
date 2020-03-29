import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { IconButton, Box, Button } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#1a73e8",
    textTransform: "initial",
    margin: "0 15px 0 10px",
    paddingLeft: 12,
    paddingRight: 12,
    "&:hover": {
      backgroundColor: "#1a73e8"
    }
  },
  profile: {
    padding: 5,
    "& img": {
      maxWidth: 32,
      borderRadius: "50%"
    }
  }
});

const HeadingRightSection = props => {
  const classes = useStyles();

  return (
    <Box position="relative" zIndex="2">
      <IconButton aria-label="comment">
        <CommentIcon />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.button}
        startIcon={<PersonAddIcon />}
      >
        Share
      </Button>
      <IconButton aria-label="profile" className={classes.profile}>
        <img src={process.env.PUBLIC_URL + "/profile.png"} alt="Sawan Nirala" />
      </IconButton>
    </Box>
  );
};

export default HeadingRightSection;
