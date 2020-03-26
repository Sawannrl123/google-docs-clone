import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import FolderSpecialOutlinedIcon from "@material-ui/icons/FolderSpecialOutlined";
import {
  Box,
  Typography,
  Button,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener
} from "@material-ui/core";
import { Input, BookMark, SavedAt } from "../components";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px"
  },
  left: {
    display: "flex",
    flex: 1,
    marginRight: 16
  },
  logo: {
    maxWidth: 40,
    paddingRight: 8,
    position: "relative",
    zIndex: 2
  },
  setting: {
    position: "relative",
    top: -5
  },
  input: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    fontSize: 14,
    textTransform: "capitalize",
    color: "#5f6368",
    padding: "0 5px 0 8px"
  },
  typo: {
    fontSize: 18,
    color: "rgba(0, 0, 0, .54)",
    padding: "0 5px 0 10px"
  },
  contain: {
    display: "flex",
    alignItems: "center"
  },
  menu: {
    zIndex: 2
  },
  specialButton: {
    minWidth: "auto",
    padding: 4,
    color: "#5f6368"
  },
  specialIcon: {
    fontSize: 18
  }
}));

const DocumentLocation = ({ isFocus, classes }) => {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("My Drive");
  const anchorRef = useRef(null);

  const handleClose = profile => event => {
    setFolder(profile);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const renderMenu = () => (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      className={classes.menu}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose(folder)}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={handleClose("My Drive")}>My Drive</MenuItem>
                <MenuItem onClick={handleClose("Portfolio")}>
                  Portfolio
                </MenuItem>
                <MenuItem onClick={handleClose("Document")}>Document</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  if (isFocus) {
    return (
      <Box className={classes.contain}>
        <Typography variant="caption" className={classes.typo}>
          in
        </Typography>
        <Button
          className={classes.button}
          startIcon={<FolderOpenIcon />}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => {
            setOpen(prevOpen => !prevOpen);
          }}
        >
          {folder}
        </Button>
        {renderMenu()}
      </Box>
    );
  }
  return (
    <Box className={classes.contain}>
      <BookMark />
      <Button
        className={classes.specialButton}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={() => {
          setOpen(prevOpen => !prevOpen);
        }}
      >
        <FolderSpecialOutlinedIcon className={classes.specialIcon} />
      </Button>
      {renderMenu()}
    </Box>
  );
};

const DocumentSetting = () => {
  const [isFocus, setIsFocus] = useState(false);

  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.left}>
          <a href="/" className={classes.logo}>
            <img
              src="https://www.gstatic.com/images/branding/product/1x/docs_48dp.png"
              alt="Google Docs"
            />
          </a>
          <Box className={classes.setting}>
            <Box className={classes.input}>
              <Input
                onFocus={() => {
                  setIsFocus(true);
                }}
                onBlur={() => {
                  setIsFocus(false);
                }}
              />
              <DocumentLocation isFocus={isFocus} classes={classes} />
            </Box>
            <Box className={classes.fake}></Box>
          </Box>
        </Box>
        <Box className={classes.right}>
          <p>Sawan</p>
        </Box>
      </Box>
      <SavedAt />
    </>
  );
};

export default DocumentSetting;
