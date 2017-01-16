import React from 'react';
import ReactDOM from 'react-dom';
import { install } from '@extjs/reactor';
import { Panel } from '@extjs/reactor/modern';

// Install the Ext JS custom renderer
install();

// When Ext JS loads, initialize our React app
Ext.onReady(
    () =>  ReactDOM.render(
        (
            <Panel title="React Ext JS">
                Hello World!
            </Panel>
        ),
        document.getElementById('root')
    )
);