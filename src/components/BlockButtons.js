import React from 'react';

export default function(props)  {
    const headerBlock = props.customEditor.isHeaderBlockActive(props.editor) ? 'true' : 'false';

    return (
        <div className={props.className}>
            <div 
                className='button'
                onMouseDown={e => { e.preventDefault(); props.customEditor.toggleHeader(props.editor); }}
                active={headerBlock}
            >
                <i className='fa fa-header' aria-hidden='true'></i>
            </div>
        </div>
    )
}