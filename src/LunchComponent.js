import React from 'react';
import { Panel, TabPanel, Grid, Container } from "@extjs/reactor/modern";
import LunchDayContainer from "./components/LunchDayContainer";
Ext.require([
    'Ext.grid.*',
])
export default class LunchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.model = Ext.create('Ext.data.Model', {
            fields: ['day', 'soup', 'meals']
        })
        this.bastaSoupsStore = Ext.create('Ext.data.JsonStore', {
            autoLoad: true,
            fields: ['soup'],
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    rootProperty: 'days'
                }
            },

        })
        this.bastaSoupsStore.filterBy(function (record) {
            var recordId = record.get('day');
            var tabId = Ext.ComponentQuery.query('#lunchTabPanel')[0].getActiveItem()._itemId;
            //console.log("tabId: "+tabId+",recordId: "+recordId);
            console.log(recordId.toUpperCase())
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


        this.bastaStore = Ext.create('Ext.data.JsonStore', {
            autoLoad: true,
            model: this.model,
            proxy: {
                type: 'ajax',
                url: '/data/basta.json',
                reader: {
                    type: 'json',
                    rootProperty: 'days'
                }
            }
        })

        this.bastaStore.filterBy(function (record, id) {
            // console.log("Filter applied !!!");
            /*  var mealsArray = record.get('meals');
              console.log(record);
              console.log(mealsArray);
              //console.log(record.data.day);
              //console.log(record.data.meals[0]);//first meal per day
              if (Ext.isArray(mealsArray)) {
                  for (var i = 0; i < mealsArray.length; i++) {
                      if(record.data.day === 'Pondělí 16. 01. 2017')
                          return true;
                  }
                  return false;
              } else {
                  return false;
              }*/
            return true;
        });
        /* this.bastaStoreMeals = Ext.create('Ext.data.Store', {
             autoLoad: true,
             fields: ['meals'],
             proxy: {
                 type: 'ajax',
                 url: '/data/basta.json',
                 reader: {
                     type: 'array',
                     rootProperty: 'meals'
                 }
             }
         })
         this.jarosStore = Ext.create('Ext.data.JsonStore',
 
             {
                 autoLoad: true,
             })

             *********
             <Container title="Monday" id="MondayContainer"
                        listeners={{
                            activate: () => {
                                //console.log("monday container")
                                this.bastaSoupsStore.load();
                            }
                        }}
                        >
     */
    }

    render() {
        return (
            <Container width="100%" height="100%">
                <TabPanel id="lunchTabPanel"
                    width="800"
                    height="500"
                    fullscreen="true"
                    tabBarPosition="top"
                    /*listeners={{
                        activate: () => { console.log("TabPanel !!!"); }
                    }}*/
                    >
                    <Container title="Monday tab" id="MondayContainer"
                        listeners={{
                            activate: () => {
                                this.bastaSoupsStore.load();
                            }
                        }} >
                        <Grid width="800" height="100"
                            store={this.bastaSoupsStore}
                            columns={[
                                { text: 'Soups of the day', dataIndex: 'soup', flex: 1 }
                            ]} />
                        <Grid width="800" height="500"
                            store={this.bastaStore}
                            columns={[
                                { text: 'Meals of the day', dataIndex: 'meals', flex: 1 }
                            ]} />
                    </Container>
                    <Container title="Tuesday" id="TuesdayContainer"
                        listeners={{
                            activate: () => {
                                this.bastaSoupsStore.load();
                            }
                        }}>
                        <Grid width="800" height="200"
                            store={this.bastaSoupsStore}
                            columns={[
                                { text: 'SOUP', dataIndex: 'soup', flex: 1 }
                            ]} />
                        <Grid
                            store={this.bastaStore}
                            columns={[
                                { text: 'Meal', dataIndex: 'meals', flex: 1 }
                            ]} />
                    </Container>
                    <Container title="Wednesday" id="WednesdayContainer">
                        <Grid
                            store={this.bastaSoupsStore}
                            columns={[
                                { text: 'SOUP', dataIndex: 'soup', flex: 1 }
                            ]} />
                        <Grid
                            store={this.bastaStore}
                            columns={[
                                { text: 'Meal', dataIndex: 'meals', flex: 1 }
                            ]} />

                    </Container>
                    <Container title="Thursday">
                        <Grid title="Soups" width="800" height="200"
                            store={this.bastaSoupsStore}
                            columns={[
                                { text: 'SOUP', dataIndex: 'soup', flex: 1 }
                            ]} />
                        <Grid title="Thursday"
                            store={this.bastaStore}
                            columns={[
                                { text: 'Meal', dataIndex: 'meals', flex: 1 }
                            ]} />
                    </Container>
                    <Container title="Friday">
                        <Grid title="Soups" width="800" height="200"
                            store={this.bastaSoupsStore}
                            columns={[
                                { text: 'SOUP', dataIndex: 'soup', flex: 1 }
                            ]} />
                        <Grid title="Friday"
                            store={this.bastaStore}
                            columns={[
                                { text: 'Meal', dataIndex: 'meals', flex: 1 }
                            ]} />
                    </Container>
                </TabPanel>
                <TabPanel
                    width="700"
                    height="500"
                    fullscreen="true"
                    tabBarPosition="top"
                    >
                    <Grid title="1" />
                    <Grid title="2" />
                </TabPanel>
            </Container >
        )
    }
}