import React, {useMemo, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact} from 'slate-react';
import LeafButtons from './components/LeafButtons';
import BlockButtons from './components/BlockButtons';
import  './main.css'

const App = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{
                text: ''
            }]
        }
    ])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);

    const renderElement = useCallback(props => {
        return <Element {...props} />
    }, []);


    return (
        <div className='editor-container'>
            <LeafButtons 
                className='buttons-container' 
                editor={editor} 
                customEditor={customEditor}
                active=''
            />
            <BlockButtons 
                className='buttons-container'
                editor={editor}
                customEditor={customEditor}
                active=''
            />
            <Slate 
                editor={editor} 
                value={value} 
                onChange={value => setValue(value)}
            >
                <Editable
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                onKeyDown={e => onKeyDown(e, editor)}
                className={'editor'}
                placeholder='Escreva algo...'
                autoFocus
            />
            </Slate>
        </div>
    )
}

const Leaf = props => {
    return (
        <span 
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? 'bold' : 'normal',
                fontStyle: props.leaf.italic ? 'italic': 'normal',
                textDecoration: props.leaf.underline ? 'underline' : 'none'
            }} 
        >
            {props.children}
        </span>
    )
}

const Element = ({attributes, children, element}) => {
    switch(element.type) {
        case 'header':
            return <h1 {...attributes}>{children}</h1>
        break;

        default:
            return <p {...attributes}>{children}</p>
    }
}

const customEditor = {

    toggleBold(editor) {
        const isActive = customEditor.isBoldStyleActive(editor);

        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalic(editor) {
        const isActive = customEditor.isItalicStyleActive(editor);

        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleUnderline(editor) {
        const isActive = customEditor.isUnderlineStyleActive(editor);

        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleHeader(editor) {
        const isActive = customEditor.isHeaderBlockActive(editor);

        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'header' },
            { match: n => Editor.isBlock(editor, n) } 
        )
    },

    isBoldStyleActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold
        });

        return !!match;
    },

    isItalicStyleActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.italic
        });

        return !!match;
    },

    isUnderlineStyleActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.underline
        });

        return !!match;
    },

    isHeaderBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'header'
        });

        return !!match;
    }
    
}

const onKeyDown = (e, editor) => {
    if(!e.ctrlKey) { return; }

    switch(e.key) {
        case 'b':
            e.preventDefault();
            customEditor.toggleBold(editor);
        break;

        case 'i':
            e.preventDefault();
            customEditor.toggleItalic(editor);
        break;

        case 'u':
            e.preventDefault();
            customEditor.toggleUnderline(editor);
        break;
         
        case 'h':
            e.preventDefault();
            customEditor.toggleHeader(editor);
        break;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));