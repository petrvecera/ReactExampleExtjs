import React from 'react';
import {Grid} from "@extjs/reactor/modern";

export class LunchDaySoupGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

        <Grid
            width="100%"
            height="150"
            disableSelection={true}
            title={this.props.title}
            store={this.props.store}
            columns={[{
                text: "Soups of the day",
                dataIndex: "soup",
                flex: 1
            }
        ]}/>
        )
    }
}

export class LunchDayMealGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Grid
            width="100%"
            height="200"
            store={this.props.store}
            columns={[{
                text: "Meals of the day",
                dataIndex: "meals",
                flex: 1
            }
        ]}/>)
    }
}