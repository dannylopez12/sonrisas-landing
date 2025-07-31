// src/components/TiptapEditor.jsx (Versión Profesional Completa)
import React, { useCallback, useEffect  } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { FontSize } from '@tiptap/extension-font-size';
import { 
  FaBold, FaItalic, FaStrikethrough, FaParagraph, 
  FaHeading, FaListUl, FaListOl, FaUndo, FaRedo 
} from 'react-icons/fa';

// --- SUB-COMPONENTE: La Barra de Herramientas ---
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const menuItems = [
    { icon: FaBold, action: () => editor.chain().focus().toggleBold().run(), name: 'Bold', active: 'bold' },
    { icon: FaItalic, action: () => editor.chain().focus().toggleItalic().run(), name: 'Italic', active: 'italic' },
    { icon: FaStrikethrough, action: () => editor.chain().focus().toggleStrike().run(), name: 'Strike', active: 'strike' },
    { icon: FaParagraph, action: () => editor.chain().focus().setParagraph().run(), name: 'Paragraph', active: 'paragraph' },
    { icon: FaHeading, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), name: 'H2', active: 'heading', attrs: { level: 2 } },
    { icon: FaHeading, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), name: 'H3', active: 'heading', attrs: { level: 3 } },
    { icon: FaListUl, action: () => editor.chain().focus().toggleBulletList().run(), name: 'Bullet List', active: 'bulletList' },
    { icon: FaListOl, action: () => editor.chain().focus().toggleOrderedList().run(), name: 'Ordered List', active: 'orderedList' },
  ];
  
  return (
    <div className="bg-gray-100 p-2 border-b border-gray-300 flex flex-wrap gap-1 items-center">
      {menuItems.map(item => (
        <button
          key={item.name}
          onClick={item.action}
          type="button"
          className={`p-2 rounded-md transition-colors ${editor.isActive(item.active, item.attrs) ? 'bg-foundation-blue text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title={item.name}
        >
          <item.icon />
        </button>
      ))}
      
      {/* Selector de Tamaño de Letra */}
      <select
        onChange={(e) => editor.chain().focus().setFontSize(`${e.target.value}px`).run()}
        value={editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
        className="p-1.5 rounded-md border-gray-300 focus:ring-foundation-blue focus:border-foundation-blue"
      >
        <option value="12">Pequeño</option>
        <option value="16">Normal</option>
        <option value="20">Grande</option>
        <option value="24">Título</option>
      </select>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DEL EDITOR (OPTIMIZADO) ---
const TiptapEditor = React.memo(({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle, // Habilita estilos de texto en línea
      FontSize.configure({ // Configura la extensión de tamaño de fuente
        types: ['textStyle'],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose lg:prose-lg max-w-none p-4 min-h-[250px] focus:outline-none',
      },
    },
  });

  // Sincroniza el contenido si cambia desde fuera (al cargar una noticia para editar)
  useEffect(() => {
    if (editor && !editor.isDestroyed && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-md shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});

export default TiptapEditor;