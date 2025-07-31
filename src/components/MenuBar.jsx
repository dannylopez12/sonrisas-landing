// src/components/MenuBar.jsx
import React from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // Define los botones y las acciones que ejecutarán
  const menuItems = [
    { action: () => editor.chain().focus().toggleBold().run(), name: 'Bold', active: editor.isActive('bold') },
    { action: () => editor.chain().focus().toggleItalic().run(), name: 'Italic', active: editor.isActive('italic') },
    { action: () => editor.chain().focus().toggleStrike().run(), name: 'Strike', active: editor.isActive('strike') },
    { action: () => editor.chain().focus().setParagraph().run(), name: 'Paragraph', active: editor.isActive('paragraph') },
    { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), name: 'H1', active: editor.isActive('heading', { level: 1 }) },
    { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), name: 'H2', active: editor.isActive('heading', { level: 2 }) },
    { action: () => editor.chain().focus().toggleBulletList().run(), name: 'Bullet List', active: editor.isActive('bulletList') },
    { action: () => editor.chain().focus().toggleOrderedList().run(), name: 'Ordered List', active: editor.isActive('orderedList') },
  ];

  return (
    <div className="bg-gray-100 p-2 border-b border-gray-300 flex flex-wrap gap-2">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={item.action}
          type="button"
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
            ${item.active ? 'bg-foundation-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}
          `}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;