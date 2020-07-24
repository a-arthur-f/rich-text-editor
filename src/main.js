import React from 'react';
import ReactDOM  from 'react-dom';
import EditorComponent from './components/Editor';
import './main.css';

const App = () => {
    return (
        <div className='editor-container'>
            <EditorComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));