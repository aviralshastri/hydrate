import React, { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function App() {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  // Custom styles for dark theme
  const editorStyles = {
    background: '#2b2b2b',
    color: '#fff',
    border: 'none'
  };

  const handleChange = (content) => {
    setContent(content);
  };

  return (
    <div className="container mx-auto p-4">
      <main>
        <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
        <ReactQuill 
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={editorStyles}
          className="h-64 mb-4"
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Editor Content:</h2>
          <div 
            className="border p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
    </div>
  );
}
