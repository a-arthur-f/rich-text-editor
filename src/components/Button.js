import React from 'react';

export default function(props) {
    return (
        <div 
            active={props.active} 
            onMouseDown={props.onMouseDown}
            className={props.className}
        >
            {props.children}
        </div>
    )
}