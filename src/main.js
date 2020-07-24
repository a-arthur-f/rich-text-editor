import React from 'react';
import ReactDOM  from 'react-dom';
import EditorComponent from './components/Editor';
import './main.css';

const App = () => {
    return (
        <div className='container'>
            <header className='cabecalho'>Rich Text Editor</header>

            <div className='editor-container'>
                <EditorComponent />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));