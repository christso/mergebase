import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var universe = require('universe');

var data = [
    {
        website: "http://vixo.com",
        address: "191 Moffat Street, Bainbridge, Louisiana, 3974",
        businessStructure: "Individual",
        phone: "+1 (879) 438-2487",
        email: "alyssa.miller@hometown.name",
        lastName: "Miller",
        firstName: "Alyssa",
        name: "HOMETOWN",
        source: "INT"
    },
    {
        website: "http://unia.com",
        address: "186 Hegeman Avenue, Craig, Oregon, 7027",
        businessStructure: "Individual",
        phone: "+1 (897) 456-2303",
        email: "charlotte.watson@dragbot.org",
        lastName: "Watson",
        firstName: "Charlotte",
        name: "DRAGBOT",
        source: "INT"
    },
    {
        website: "http://enaut.com",
        address: "526 Maujer Street, Carlos, Alabama, 9898",
        businessStructure: "Individual",
        phone: "+1 (818) 509-3862",
        email: "malone.meyers@injoy.me",
        lastName: "Meyers",
        firstName: "Malone",
        name: "INJOY",
        source: "INT"
    },
    {
        website: "http://enaut.com",
        address: "526 Maujer Street, Carlos, Alabama, 9898",
        businessStructure: "Individual",
        phone: "+1 (818) 509-3862",
        email: "malone.meyers@injoy.me",
        lastName: "Meyers",
        firstName: "Malone",
        name: "INJOY",
        source: "WFM"
    },
    {
        website: "http://cytrak.com",
        address: "219 Hart Place, Elfrida, Alaska, 256",
        businessStructure: "Individual",
        phone: "+1 (848) 516-3435",
        email: "judy.snider@ersum.com",
        lastName: "Snider",
        firstName: "Judy",
        name: "ERSUM",
        source: "WFM"
    },
    {
        website: "http://acusage.com",
        address: "281 Eaton Court, Corinne, Minnesota, 3320",
        businessStructure: "Individual",
        phone: "+1 (832) 554-3003",
        email: "meadows.roberson@bizmatic.co.uk",
        lastName: "Roberson",
        firstName: "Meadows",
        name: "BIZMATIC",
        source: "WFM"
    },
    {
        website: "http://comveyor.com",
        address: "788 Amboy Street, Brownlee, Colorado, 9638",
        businessStructure: "Individual",
        phone: "+1 (902) 600-2794",
        email: "woods.henson@kindaloo.info",
        lastName: "Henson",
        firstName: "Woods",
        name: "KINDALOO",
        source: "WFM"
    }
];



class MergeTool extends Component {
    componentDidMount() {
        data = data.map(function (el) {
            el.source === "WFM" ? el.wfm = 1 : el.wfm = 0;
            el.source === "INT" ? el.int = 1 : el.int = 0;
            return el;
        });
        var groupToValues = data.reduce(function(obj,item){
            obj[item.name] = obj[item.name] || [];

            if (item.source === "WFM") 
                obj[item.name].wfmFlag = 1;
            else if (item.source === "INT")
                obj[item.name].intFlag = 1;
            return obj;
        }, {});
        var groups = Object.keys(groupToValues).map(function(key){
            return {
                name: key, 
                intSrc: groupToValues[key].intSrc, 
                wfmSrc: groupToValues[key].wfmSrc
            };
        });  
        
        console.log(groups);
        //console.log(data);
    }

    render() {
        return (
            <div className="panel">
                <h2>Merge Tool</h2>
            </div>
        )
    }
}

export default MergeTool;