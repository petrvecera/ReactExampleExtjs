import React from 'react';
import { Panel, TabPanel, Grid, Container } from "@extjs/reactor/modern";
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
                },
                name: 'day'
            }],
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    rootProperty: 'days'

                }
            }

        });
        this.bastaStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['meals'],
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    rootProperty: function (obj) {
                        switch (Ext.ComponentQuery.query('#lunchTabPanel')[0].getActiveItem().getId()) {
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
        });

        this.jarosiSoupsStore = Ext.create('Ext.data.JsonStore', {
            autoload: true,
            fields: ['soups'],
            proxy: {
                type: 'ajax',
                url: '/data/jarosi.json',
                reader: {
                    rootProperty: 'days'
                }
            }
        })
        this.jarosiStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['meals'],
            proxy: {
                type: 'ajax',
                url: '/data/jarosi.json',
                reader: {
                    rootProperty: function (obj) {
                        switch (Ext.ComponentQuery.query('#lunchTabPanel1')[0].getActiveItem().getId()) {
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

        // The tabs are always synced, only one filter function is needed.
        function filterStoreBy(record) {
            var recordId = record.get('day');
            switch (Ext.ComponentQuery.query('#lunchTabPanel')[0].getActiveItem().getId()) {
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
        }

        this.bastaSoupsStore.filterBy(filterStoreBy);
        this.jarosiSoupsStore.filterBy(filterStoreBy);
    }

    render() {
            var bastaOriginalTitle = "Pustkovecká Bašta - ";
            var bastaTitle= "Pustkovecká Bašta ";
            var jarosiTitle="U Jarošů";

        return (
            <Container width="100%" height="100%">
                <TabPanel id="lunchTabPanel"
                          fullscreen="true"
                          height="400"
                          tabBarPosition="top"
                          listeners={{
                        activeItemchange: (sender, value, oldValue, eOpts ) => {
                            this.bastaSoupsStore.load();
                            this.bastaStore.load();
                            
                            // TODO: Does not work. It will always add title from one day back, idk why.
                            //       Looks like the store is not yet loaded / fitler is not applied. 
                            // var sp = this.bastaSoupsStore.load();
                            // if (sp.getAt(0)) {
                            //     bastaTitle = bastaOriginalTitle + sp.getAt(0).get('day');
                            //     Ext.ComponentQuery.query('#' + value.getId() + ' grid')[0].setTitle(bastaTitle);
                            // }
                        
                            Ext.first('#lunchTabPanel1').setActiveItem(sender.innerIndexOf(value));

                        }
                    }}
                >
                    <Container title="Monday" id="MondayContainer" fullscreen="true">
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore}/>
                    </Container>
                    <Container title="Tuesday" id="TuesdayContainer" fullscreen="true">
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore}/>
                    </Container>
                    <Container title="Wednesday" id="WednesdayContainer" fullscreen="true">
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore}/>
                    </Container>
                    <Container title="Thursday" id="ThursdayContainer" fullscreen="true">
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore}/>
                    </Container>
                    <Container title="Friday" id="FridayContainer" fullscreen="true">
                        <LunchDaySoupGrid store={this.bastaSoupsStore} title={bastaTitle}/>
                        <LunchDayMealGrid store={this.bastaStore}/>
                    </Container>
                </TabPanel>
                <TabPanel
                    id="lunchTabPanel1"
                    fullscreen="true"
                    height="400"
                    tabBarPosition="bottom"
                    listeners={{
                        activeItemchange: (sender, value, oldValue, eOpts ) => {
                            this.jarosiSoupsStore.load();
                            this.jarosiStore.load();
                        
                            Ext.first('#lunchTabPanel').setActiveItem(sender.innerIndexOf(value));
                        }
                    }}
                >
                    <Container title="Monday" id="MondayContainer1" fullscreen="true">
                        <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                        <LunchDayMealGrid store={this.jarosiStore}/>
                    </Container>
                    <Container title="Tuesday" id="TuesdayContainer1" fullscreen="true">
                        <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                        <LunchDayMealGrid store={this.jarosiStore}/>
                    </Container>
                    <Container title="Wednesday" id="WednesdayContainer1" fullscreen="true">
                        <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                        <LunchDayMealGrid store={this.jarosiStore}/>
                    </Container>
                    <Container title="Thursday" id="ThursdayContainer1" fullscreen="true">
                        <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                        <LunchDayMealGrid store={this.jarosiStore}/>
                    </Container>
                    <Container title="Friday" id="FridayContainer1" fullscreen="true">
                        <LunchDaySoupGrid store={this.jarosiSoupsStore} title={jarosiTitle}/>
                        <LunchDayMealGrid store={this.jarosiStore}/>
                    </Container>

                </TabPanel>
            </Container>
        )
    }
}