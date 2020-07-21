import React, {useMemo, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact} from 'slate-react';
import Buttons from './components/Buttons';
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


    return (
        <div className='editor-container'>
            <Buttons 
                className='buttons-container' 
                editor={editor} 
                onMouseDown={customEditor}
                active={customEditor}
            />
            <Slate 
                editor={editor} 
                value={value} 
                onChange={value => setValue(value)}
            >
                <Editable
                renderLeaf={renderLeaf}
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

const customEditor = {
        
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
    }
}

ReactDOM.render(<App />, document.getElementById('root'));