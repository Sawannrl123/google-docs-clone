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
      this.localStorage.setItem("savedAt", new Date().getTime());
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
          height: "calc(100vh - 31px)",
          branding: false,
          elementpath: false,
          resize: false,
          toolbar_mode: "scrolling",
          statusbar: false,
          content_css: "index.css?" + new Date().getTime(),
          pagebreak_split_block: true,
          tinycomments_mode: "embedded",
          tinycomments_author: "Sawan Nirala",
          menu: {
            custom: {
              title: "Add-ons",
              items: "dAddons | pDocs | gAddons mAddons"
            }
          },
          menubar: "file edit view insert format tools custom help",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount pagebreak formatpainter tinymcespellchecker fontselect fontsizeselect imagetools tinycomments"
          ],
          toolbar:
            "undo redo print spellchecker formatpainter | zoom | formatselect | fontselect | fontsizeselect | bold italic underline forecolor backcolor | link showcomments image | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          setup: editor => {
            editor.ui.registry.addSplitButton("zoom", {
              text: "100%",
              onAction: function(_) {
                //editor.insertContent("<p>Its Friday!</p>");
              },
              onItemAction: function(buttonApi, value) {
                //editor.insertContent(value);
              },
              fetch: function(callback) {
                var items = [
                  {
                    type: "choiceitem",
                    text: "Fit",
                    value: ""
                  },
                  {
                    type: "choiceitem",
                    text: "50%",
                    value: ""
                  },

                  {
                    type: "choiceitem",
                    text: "75%",
                    value: ""
                  },
                  {
                    type: "choiceitem",
                    text: "90%",
                    value: ""
                  },
                  {
                    type: "choiceitem",
                    text: "100%",
                    value: ""
                  },
                  {
                    type: "choiceitem",
                    text: "125%",
                    value: ""
                  },
                  {
                    type: "choiceitem",
                    text: "150%",
                    value: ""
                  }
                ];
                callback(items);
              }
            });
            editor.ui.registry.addMenuItem("dAddons", {
              text: "Documents Add-ons",
              onAction: text => {
                console.log(text);
              }
            });
            editor.ui.registry.addMenuItem("pDocs", {
              text: "Panda Docs",
              onAction: text => {
                console.log(text);
              }
            });
            editor.ui.registry.addMenuItem("gAddons", {
              text: "Get Add-ons",
              onAction: text => {
                console.log(text);
              }
            });
            editor.ui.registry.addMenuItem("mAddons", {
              text: "Manage Add-ons",
              onAction: text => {
                console.log(text);
              }
            });
          }
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default EditorComponent;
