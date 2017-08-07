
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



data = data.map(function (el) {
    el.source === "WFM" ? el.wfm = 1 : el.wfm = 0;
    el.source === "INT" ? el.int = 1 : el.int = 0;
    return el;
});
var groupToValues = data.reduce(function(obj,item){
    obj[item.firstName] = obj[item.firstName] || {};
    obj[item.firstName][item.lastName] = obj[item.firstName][item.lastName] || {};
    let resItem = obj[item.firstName][item.lastName];

    if (!resItem.wfmFlag) resItem.wfmFlag = 0;
    if (!resItem.intFlag) resItem.intFlag = 0;
    if (item.source === "WFM") 
        resItem.wfmFlag = 1;
    else if (item.source === "INT")
        resItem.intFlag = 1;
    return obj;
}, {});
var groups = Object.keys(groupToValues).map(function(fnKey) {
    return Object.keys(groupToValues[fnKey]).map(function(lnKey) {
        return {
            firstName: fnKey,
            lastName: lnKey,
            intSrc: groupToValues[fnKey][lnKey].intFlag, 
            wfmSrc: groupToValues[fnKey][lnKey].wfmFlag
        }
    });
});  
groups = groups.map(function(el) {
    return el[0];
});
console.log(groups);