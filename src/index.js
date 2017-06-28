/**
 * Libraries
 */
import React from 'react';
import { render}  from 'react-dom';

import marked from 'marked';

/**
 * StyleSheet files
 */
import './style/css/bootstrap.min.css';
import './index.css';

/**
 * Custom JS files with or without external libraries
 */
import { sampleText } from './sampleText';

class App extends React.Component {

    state = {
        text: sampleText
    };

    componentWillMount(){
        const localSorageText = localStorage.getItem('text');

        if(localSorageText){
            this.setState({ text: localSorageText })
        }
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('text', nextState.text);
    }

    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    editText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Markdown</h1>
                        <textarea
                            value={this.state.text}
                            rows="35"
                            className="form-control"
                            onChange={(e) => this.editText(e)}
                        >
                        </textarea>
                    </div>
                    <div className="col-sm-6">
                        <h1>Résultats</h1>
                        <div dangerouslySetInnerHTML={ this.renderText(this.state.text) } />
                    </div>
                </div>
                <div>
                    Coucou
                </div>
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
);