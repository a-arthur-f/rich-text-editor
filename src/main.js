import React, {useMemo, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact, useEditor, useSlate} from 'slate-react';
import Button from './components/Button';
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
            <Slate editor={editor} value={value} onChange={value => setValue(value)}
                    className='slate'
            >

                <div className='buttons-container'>
                    <StyleButton format='bold' icon='fa fa-bold' />
                    <StyleButton format='italic' icon='fa fa-italic' />
                    <StyleButton format='underline' icon='fa fa-underline' />
                    <StyleButton format='strike' icon='fa fa-strikethrough' /> 
                    <StyleButton format='code' icon='fa fa-code' />
                    
                    <BlockButton format='header' icon='fa fa-header' />
                    <BlockButton format='quote' icon='fa fa-quote-right' />
                </div>

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

const Leaf = ({attributes, children, leaf}) => {
    if(leaf.bold)
        children = <strong>{children}</strong>
    if(leaf.italic)
        children = <em>{children}</em>
    if(leaf.underline)
        children = <u>{children}</u>
    if(leaf.strike)
        children = <strike>{children}</strike>

    if(leaf.code) 
        children = <code>{children}</code>

    return <span {...attributes}>{children}</span>
}

const Element = ({attributes, children, element}) => {
    switch(element.type) {
        case 'header':
            return <h1 {...attributes}>{children}</h1>
        break;

        case 'quote':
            return <blockquote {...attributes}>{children}</blockquote>
        break;

        default:
            return <p {...attributes}>{children}</p>
    }
}

const BlockButton = props => {
    const editor = useEditor();
    return (
        <Button
            active={customEditor.isBlockActive(editor, props.format).toString()}
            className='button'
            onMouseDown={e => {
                e.preventDefault();
                customEditor.toggleBlock(editor, props.format)
            }}
        >
            <i className={props.icon}></i>
        </Button>
    )
}

const StyleButton = props => {
    const editor = useSlate();
    return (
        <Button
            active={customEditor.isStyleActive(editor, props.format).toString()}
            className='button'
            onMouseDown={e => {
                e.preventDefault();
                customEditor.toggleStyle(editor, props.format);
            }}
        >
            <i className={props.icon}></i>
        </Button>
    )
}

const onKeyDown = (e, editor) => {
    if(!e.ctrlKey) { return; }

    switch(e.key) {
        case 'b':
            e.preventDefault();
            customEditor.toggleStyle(editor, 'bold');
        break;

        case 'i':
            e.preventDefault();
            customEditor.toggleStyle(editor, 'italic');
        break;

        case 'u':
            e.preventDefault();
            customEditor.toggleStyle(editor, 'underline');
        break;
         
        case 'h':
            e.preventDefault();
            customEditor.toggleBlock(editor, 'header');
        break;
    }
}

const customEditor = {

    toggleBlock(editor, format) {
        const isActive = customEditor.isBlockActive(editor, format);

        Transforms.setNodes(editor,
            { type: isActive ? 'paragraph' : format },
            { match: n => Editor.isBlock(editor, n) }
        )
    },

    toggleStyle(editor, format) {
        const isActive = customEditor.isStyleActive(editor, format);

        if(isActive) {
            Editor.removeMark(editor, format);
        }
            
        else {
            Editor.addMark(editor, format, true);
        }
    },

    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === format
        });

        return !!match;
    },
    
    isStyleActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    }
    
}

ReactDOM.render(<App />, document.getElementById('root'));