import React from 'react';
import ReactDOM from 'react-dom';
import { install } from '@extjs/reactor';
import LunchComponent from './LunchComponent';


// Install the Ext JS custom renderer
install();

// When Ext JS loads, initialize our React app
Ext.onReady(
    () =>  ReactDOM.render(
        (   
            <LunchComponent/>
        ),
        document.getElementById('root')
    )
);