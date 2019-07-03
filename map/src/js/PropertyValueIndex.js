
//input objArray [{a:1,b:"22"},{a:100,b:"abc"}], arrayOfProperties : ["a"]
//output {a:[1,100]}

//input objArray [{a:1,b:"22"},{a:100,b:"abc"}], arrayOfProperties : ["a","b"]
//output {a:[1,100], b:["22","abc"]}

function buildPropertyValueIndex(objArray, arrayOfPropertyNames) {
    var resultObj = {};// format {zip:["v1","v2","V3"],model_type:["c1","c2","c3"]}

    //add all properties to result object
    for (i = 0; i < arrayOfPropertyNames.length; i++) {
        resultObj[arrayOfPropertyNames[i]] = [];//assign empty array
    }
    for (j = 0; j < objArray.length; j++) {
        for (i = 0; i < arrayOfPropertyNames.length; i++) {
            if (resultObj[arrayOfPropertyNames[i]].indexOf(objArray[j][arrayOfPropertyNames[i]])
                     == -1) {
                resultObj[arrayOfPropertyNames[i]].push(objArray[j][arrayOfPropertyNames[i]]);
            }
        }

    }
    console.log('returning obj indexing -- ', resultObj);

    return resultObj;
}