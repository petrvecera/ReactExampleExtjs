import React from 'react';
import { Container } from "@extjs/reactor/modern";

export default class LunchDayContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container title={this.props.title} id={this.props.MondayContainer}
                listeners={{
                    activate: () => {
                        console.log('HOBLUJ pico');
                        console.log(this.props.bastaSoupsStore)
                        //this.props.bastaSoupsStore.load();
                    }
                }} />


        )

}}