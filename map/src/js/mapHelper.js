
//dataIndexObj -> returned by buildPropertyValueMap in format {a:[1,100], b:["22","abc"]}
// default lable builder, can be null. by default returns property value as lable
//specific lable builder, if a builder is provided for zip, we need to pass method with same name

function buildFilterChoiceOptions(dataIndexObj, builderConfig) {
    console.log('buildFilterChoiceOptions', dataIndexObj);
    var returnVal = [];//

    //expected output format:
    //  [
    //   {
    //     title: 'Model Type',
    //     radio: false,
    //     choices: [          
    //       {name: 'model_type', values: ['GC'], label: 'Child care'},
    //       {name: 'model_type', values: ['GD'], label: 'Dual'},
    //       {name: 'model_type', values: ['GH'], label: 'Headstart'}            
    //     ]
    //   },
    //   {
    //     title: 'zip',
    //     radio: false,
    //     choices:zipFilterArray
    //   }

    if (dataIndexObj == null) {
        console.error('data index obj is null');
        return returnVal;
    }

    $.each(dataIndexObj, function (propertyName, value) {
        console.log('data index obj property and value:', propertyName, value);
        if(value == null) return;
        currObj = {};
        var titleFn =  getConfigFunction(builderConfig,propertyName,'title');
        var applyDefaultsFn =  getConfigFunction(builderConfig,propertyName,'applyDefaults');
        var lableFn =  getConfigFunction(builderConfig,propertyName,'label');

        currObj.title = titleFn != null? titleFn(propertyName):propertyName;
        if(applyDefaultsFn != null) applyDefaultsFn(currObj,propertyName);
        currObj.choices = [];
        
        for(i=0;i<value.length;i++){
            var label = lableFn != null? lableFn(value[i]):value[i];
            currObj.choices.push(
                {name: propertyName, values: [value[i]], label: label}
            )
        }

        console.log('curr choice object',currObj);
        returnVal.push(currObj);

    });

    console.log('all choices combined ', returnVal);
return returnVal;
}

function getConfigFunction(builderConfig, propertyName, typeOfFunctionToGet) {
    if (builderConfig != null && builderConfig[propertyName] != null &&
        builderConfig[propertyName][typeOfFunctionToGet] != null) {
        console.log('returning user provided function for ', propertyName, typeOfFunctionToGet)
        return builderConfig[propertyName][typeOfFunctionToGet];
    }
    else if (builderConfig != null && builderConfig['default'] != null &&
        builderConfig['default'][typeOfFunctionToGet] != null) {
        console.log('returning DEFAULT function for ', propertyName, typeOfFunctionToGet)

        return builderConfig['default'][typeOfFunctionToGet];
    }
    else {
        console.log('no default or custom  function for ', propertyName, typeOfFunctionToGet)

        return null;
    }
}