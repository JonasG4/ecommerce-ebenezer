"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import "@/styles/quill.custom.css";
import dynamic from "next/dynamic";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor({
  label,
  subtitle = "",
  value,
  onChange,
  errMessage,
}) {


  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (errMessage) {
      setValidation(errMessage);
    }
  }, [errMessage]);

  const optionsInit = {
    height: 300,
    selector: "textarea",
    menubar: "file edit view insert table help",
    menu: {
      file: {
        title: "Archivo",
        items:
          "newdocument restoredraft | preview | export print | deleteallconversations",
      },
      edit: {
        title: "Editar",
        items:
          "undo redo | cut copy paste pastetext | selectall | searchreplace",
      },
      view: {
        title: "Ver",
        items: "preview fullscreen",
      },
      insert: {
        title: "Insertar",
        items:
          "link addcomment pageembed inserttable | emoticons hr | pagebreak nonbreaking tableofcontents | insertdatetime",
      },
      table: {
        title: "Tabla",
        items:
          "inserttable | cell row column | advtablesort | tableprops deletetable",
      },
      help: { title: "Ayuda", items: "help" },
    },
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "preview",
      "searchreplace",
      "",
      "fullscreen",
      "insertdatetime",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks | " +
      "bold italic underline strikethrough | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | table" +
      "removeformat | help",
    table_toolbar:
      "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",

    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  };

  const handlerChange = (text) => {
    onChange(text);
    setValidation(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor="editor" className="text-sm text-gray-600 font-bold">
          {label} <span className={`text-indigo-600`}>*</span>
        </label>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>
      <div className="pb-6 relative">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          id="editor"
          onEditorChange={handlerChange}
          value={value}
          init={optionsInit}
        />
        <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {validation ? validation : ""}
        </p>
      </div>
    </div>
  );
}

export const SkeletonEditor = () => (
  <div className="w-full h-[150px] rounded-md bg-gray-100 ring-1 ring-gray-300 animate-pulse "></div>
);
