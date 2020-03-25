import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import localStorage from "../localStorage";

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
    this.localStorage = localStorage();
  }

  componentDidMount = async () => {
    if (this.localStorage) {
      const content = await this.localStorage.getItem("documentContent");
      this.setState({ content });
    } else {
      console.log("Sorry! No Web Storage support..");
    }
  };

  handleEditorChange = (content, editor) => {
    this.setState({ content });
    if (this.localStorage) {
      this.localStorage.setItem("documentContent", content);
    } else {
      console.log("Sorry! No Web Storage support..");
    }
    //console.log("Content was updated:", content);
    //console.log("Content was updated:", editor);
  };

  render() {
    const { content } = this.state;
    return (
      <Editor
        initialValue={content}
        apiKey="w53jltrie1h5aeaaaq96rilp17d5kitruhi2whk5g47tyncu"
        init={{
          height: "100vh",
          branding: false,
          elementpath: false,
          resize: false,
          statusbar: false,
          content_css: "index.css?" + new Date().getTime(),
          pagebreak_split_block: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount pagebreak"
          ],
          toolbar:
            "pagebreak | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default EditorComponent;
