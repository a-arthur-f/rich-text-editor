import React from 'react';

export default function(props) {
    const boldStyle = props.active.isBoldStyleActive(props.editor) ? 'true' : 'false';
    const italicStyle = props.active.isItalicStyleActive(props.editor) ? 'true': 'false';
    const underlineStyle = props.active.isUnderlineStyleActive(props.editor) ? 'true' : 'false';

    return (
        <div className={props.className}>
            <div 
                className="button" 
                onMouseDown={e => { e.preventDefault(); props.onMouseDown.toggleBold(props.editor); }}
                active={boldStyle}
            >
                <i className="fa fa-bold" aria-hidden="true"></i>
            </div>

            <div 
                className="button"
                onMouseDown={e => { e.preventDefault(); props.onMouseDown.toggleItalic(props.editor); }}
                active={italicStyle}
            >
                <i className="fa fa-italic" aria-hidden="true"></i>
            </div>

            <div 
                className="button"
                onMouseDown={e => { e.preventDefault(); props.onMouseDown.toggleUnderline(props.editor); }}
                active={underlineStyle}
            >
                <i className="fa fa-underline" aria-hidden="true"></i>
            </div>
        </div>
    )
}