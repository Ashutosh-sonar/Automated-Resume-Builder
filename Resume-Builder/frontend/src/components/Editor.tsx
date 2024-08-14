import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newValue = value + '\n* ';
      onChange(newValue);
    }
  };

  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={handleKeyDown}
      className="bg-slate-200 h-full p-2"
      placeholder="Enter skills with bullet marks"
    />
  );
};

export default Editor;