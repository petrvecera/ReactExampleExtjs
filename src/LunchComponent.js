import React from 'react';
import { Panel, TabPanel, Grid, Container } from "@extjs/reactor/modern";
import LunchDayContainer from "./components/LunchDayContainer";
import {LunchDaySoupGrid,LunchDayMealGrid} from './components/LunchDayGrid';

Ext.require([
    'Ext.grid.*',
])


export default class LunchComponent extends React.Component {
    constructor(props) {
        super(props);
        //-----STORES-----
        this.bastaSoupsStore = Ext.create('Ext.data.JsonStore', {
            autoLoad: true,
            fields: [{
                name: 'soups', convert: function (v, record) {
                }
            }],
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    rootProperty: 'days'

                }
            },

        })
        this.bastaStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['meals'],
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    rootProperty: function(obj)
                    {
                        switch (Ext.ComponentQuery.query('#lunchTabPanel')[0].getActiveItem()._itemId) {
                            case "MondayContainer":
                                return obj.days[0].meals;
                            case "TuesdayContainer":
                                return obj.days[1].meals;
                            case "WednesdayContainer":
                                return obj.days[2].meals;
                            case "ThursdayContainer":
                                return obj.days[3].meals;
                            case "FridayContainer":
                                return obj.days[4].meals;
                        }
                    }
                }
            }
        })

        this.jarosiSoupsStore= Ext.create('Ext.data.JsonStore',{
            autoload:true,
            fields:['soups'],
            proxy:{
                type:'ajax',
                url:'/data/jarosi.json',
                reader:{
                    rootProperty:'days'
                }
            }
        })
        this.jarosiStore=Ext.create('Ext.data.Store',{
            autoLoad:true,
            fields:['meals'],
            proxy: {
                type: 'ajax',
                url: '/data/jarosi.json',
                reader: {
                    rootProperty: function(obj)
                    {
                        switch (Ext.ComponentQuery.query('#lunchTabPanel1')[0].getActiveItem()._itemId) {
                            case "MondayContainer1":
                                return obj.days[0].meals;
                            case "TuesdayContainer1":
                                return obj.days[1].meals;
                            case "WednesdayContaine1r":
                                return obj.days[2].meals;
                            case "ThursdayContainer1":
                                return obj.days[3].meals;
                            case "FridayContainer1":
                                return obj.days[4].meals;
                        }
                    }
                }
            }
        })

        //-----Store's filters-----
        this.bastaSoupsStore.filterBy(function (record) {
            var recordId = record.get('day');
            switch (Ext.ComponentQuery.query('#lunchTabPanel')[0].getActiveItem()._itemId) {
                case "MondayContainer":
                    if (recordId.includes('Pon')) {
                        return true;
                    }
                    break;
                case "TuesdayContainer":
                    if (recordId.includes('Út')) {
                        return true;
                    }
                    break;
                case "WednesdayContainer":
                    if (recordId.includes('St')) {
                        return true;
                    }
                    break;
                case "ThursdayContainer":
                    if (recordId.includes('Čt')) {
                        return true;
                    }
                    break;
                case "FridayContainer":
                    if (recordId.includes('Pá')) {
                        return true;
                    }
                    break;
            }

        })
        this.jarosiSoupsStore.filterBy(function(record){
            var recordId = record.get('day');
            switch (Ext.ComponentQuery.query('#lunchTabPanel1')[0].getActiveItem()._itemId) {
                case "MondayContainer1":
                    if (recordId.includes('Pon')) {
                        return true;
                    }
                    break;
                case "TuesdayContainer1":
                    if (recordId.includes('Út')) {
                        return true;
                    }
                    break;
                case "WednesdayContainer1":
                    if (recordId.includes('St')) {
                        return true;
                    }
                    break;
                case "ThursdayContainer1":
                    if (recordId.includes('Čt')) {
                        return true;
                    }
                    break;
                case "FridayContainer1":
                    if (recordId.includes('Pá')) {
                        return true;
                    }
                    break;
            }
        })
    }


    render() {
            var bastaTitle="Pustkovecká Bašta"
            var jarosiTitle="U Jarošů"
        return (
            <Container width="100%" height="100%">
                <TabPanel id="lunchTabPanel"
                    fullscreen="true"
                    height="400"
                    tabBarPosition="top">
                    <Container title="Monday" id="MondayContainer"
                               fullscreen="true"
                        listeners={{
                            activate: () => {
                                this.bastaSoupsStore.load();
                                this.bastaStore.load();
                                if( typeof Ext.ComponentQuery.query('#lunchTabPanel1')[0] != 'undefined')
                                {
                                    Ext.ComponentQuery.query('#lunchTabPanel1')[0].setActiveItem(0)

                                }
                            }
                        }} >
                        <LunchDaySoupGrid store={this.bastaSoupsStore}title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore} />
                    </Container>
                    <Container title="Tuesday" id="TuesdayContainer"
                               fullscreen="true"
                        listeners={{
                            activate: () => {
                                this.bastaSoupsStore.load();
                                this.bastaStore.load();
                                Ext.ComponentQuery.query('#lunchTabPanel1')[0].setActiveItem(1)
                            }
                        }}>
                        <LunchDaySoupGrid store={this.bastaSoupsStore}title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore} />
                    </Container>
                    <Container title="Wednesday" id="WednesdayContainer"
                               fullscreen="true"
                        listeners={{
                            activate: () => {
                                this.bastaSoupsStore.load();
                                this.bastaStore.load();
                                Ext.ComponentQuery.query('#lunchTabPanel1')[0].setActiveItem(2)
                            }
                        }} >
                        <LunchDaySoupGrid store={this.bastaSoupsStore}title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore} />
                    </Container>
                    <Container title="Thursday" id="ThursdayContainer"
                               fullscreen="true"
                               listeners={{
                                   activate: () => {
                                       this.bastaSoupsStore.load();
                                       this.bastaStore.load();
                                       Ext.ComponentQuery.query('#lunchTabPanel1')[0].setActiveItem(3)
                                   }
                               }}>
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore} />
                    </Container>
                    <Container title="Friday" id="FridayContainer"
                               fullscreen="true"
                               listeners={{
                                   activate: () => {
                                       this.bastaSoupsStore.load();
                                       this.bastaStore.load();
                                       Ext.ComponentQuery.query('#lunchTabPanel1')[0].setActiveItem(4)
                                   }
                               }}>
                        <LunchDaySoupGrid store={this.bastaSoupsStore}title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore} />
                    </Container>
                </TabPanel>
                <TabPanel
                    id="lunchTabPanel1"
                    fullscreen="true"
                    height="400"
                    tabBarPosition="bottom">
                <Container title="Monday" id="MondayContainer1"
                           fullscreen="true"
                           listeners={{
                               activate: () => {
                                   this.jarosiSoupsStore.load();
                                   this.jarosiStore.load();
                                   Ext.ComponentQuery.query('#lunchTabPanel')[0].setActiveItem(0)
                               }
                           }} >
                    <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                    <LunchDayMealGrid store={this.bastaStore} />
                </Container>
                <Container title="Tuesday" id="TuesdayContainer1"
                           fullscreen="true"
                           listeners={{
                               activate: () => {
                                   this.jarosiSoupsStore.load();
                                   this.jarosiStore.load();
                                   Ext.ComponentQuery.query('#lunchTabPanel')[0].setActiveItem(1)
                               }
                           }}>
                    <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                    <LunchDayMealGrid store={this.bastaStore} />
                </Container>
                <Container title="Wednesday" id="WednesdayContainer1"
                           fullscreen="true"
                           listeners={{
                               activate: () => {
                                   this.bastaSoupsStore.load();
                                   this.bastaStore.load();
                                   Ext.ComponentQuery.query('#lunchTabPanel')[0].setActiveItem(2)
                               }
                           }} >
                    <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                    <LunchDayMealGrid store={this.bastaStore} />
                </Container>
                <Container title="Thursday" id="ThursdayContainer1"
                           fullscreen="true"
                           listeners={{
                               activate: () => {
                                   this.bastaSoupsStore.load();
                                   this.bastaStore.load();
                                   Ext.ComponentQuery.query('#lunchTabPanel')[0].setActiveItem(3)
                               }
                           }}>
                    <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                    <LunchDayMealGrid store={this.bastaStore} />
                </Container>
                <Container title="Friday" id="FridayContainer1"
                           fullscreen="true"
                           listeners={{
                               activate: () => {
                                   this.bastaSoupsStore.load();
                                   this.bastaStore.load();
                                   Ext.ComponentQuery.query('#lunchTabPanel')[0].setActiveItem(4)
                               }
                           }}>
                    <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                    <LunchDayMealGrid store={this.bastaStore} />
                </Container>

                </TabPanel>
            </Container >
        )
    }
}