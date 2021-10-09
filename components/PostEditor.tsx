import { useRef, useEffect } from "react";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Codemirror = ({ source, setSource }) => {
  const editor = useRef<EditorView>();

  useEffect(() => {
    const onUpdate = () =>
      EditorView.updateListener.of((v: ViewUpdate) => {
        const doc = v.state.doc;
        const value = doc.toString();
        if (value !== source) setSource(value);
      });
    const el = document.getElementById("codemirror-editor-wrapper");

    editor.current = new EditorView({
      state: EditorState.create({
        doc: source,
        extensions: [basicSetup, markdown(), oneDark, onUpdate()],
      }),
      parent: el as Element,
    });
  }, [setSource, source]);

  const Rendered = () => (
    <div className="border rounded p-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-2 gap-5">
        <div id="codemirror-editor-wrapper" />
        <Rendered />
      </div>
    </div>
  );
};

export default Codemirror;
