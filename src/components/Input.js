import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import AutosizeInput from "react-input-autosize";
import localStorage from "../localStorage";

const useStyles = makeStyles({
  root: {
    position: "relative",
    zIndex: 2,
    "& input": {
      color: "#000",
      fontSize: "18px",
      fontVariantLigatures: "no-contextual",
      height: "20px",
      fontWeight: 500,
      lineHeight: "22px",
      minWidth: "1px",
      visibility: "visible",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      borderImage: "initial",
      margin: 0,
      padding: "2px 7px",
      borderRadius: "2px",
      "&:hover": {
        borderColor: "#e5e5e5"
      },
      "&:focus": {
        borderColor: "#1a73e8",
        borderRadius: "4px",
        outline: "none",
        "-webkitAppearance": "none",
        "-mozAppearance": "none"
      }
    }
  }
});

const Input = props => {
  const [name, setName] = useState("Untitled Document");
  const classes = useStyles();

  useEffect(() => {
    const getDocumentName = async () => {
      const ls = localStorage();
      if (ls) {
        const documentName =
          (await ls.getItem("documentName")) || "Untitled Document";
        setName(documentName);
      } else {
        console.log("Sorry! No Web Storage support..");
      }
    };
    getDocumentName();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${name} - Google Docs`}</title>
      </Helmet>
      <AutosizeInput
        name="document-name"
        value={name}
        className={classes.root}
        {...props}
        onChange={e => {
          setName(e.target.value);
          localStorage().setItem("documentName", e.target.value);
        }}
      />
    </>
  );
};

export default Input;
