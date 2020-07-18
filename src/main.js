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
    }, [])

    const onKeyDown = (e, editor) => {
        if(e.key === 'b' && e.ctrlKey) {
            e.preventDefault();

            const [match] = Editor.nodes(editor, {
                match: n => n.bold
            })

            Transforms.setNodes(
                editor,
                { bold: match ? null : true },
                { match: n => Text.isText(n), split: true }
            )
        }

        else if(e.key === 'i' && e.ctrlKey) {
            e.preventDefault();

            const [match] = Editor.nodes(editor, {
                match: n => n.italic
            })

            Transforms.setNodes(
                editor,
                { italic: match ? null : true },
                { match: n => Text.isText(n), split: true }
            )
        }
    }

    return (
        <div className='root-container'>
            <div className='editor-container'>
                <Buttons className='buttons-container'/>
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
                />
                </Slate>
            </div>
        </div>
    )
}

const Leaf = props => {
    return (
        <span 
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? 'bold' : 'normal',
                fontStyle: props.leaf.italic ? 'italic': 'normal'
            }} 
        >
            {props.children}
        </span>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));