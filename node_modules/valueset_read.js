function processRead(dhisScriptContext) {
    var id = false;
    if (!dhisScriptContext instanceof Java.type("org.hisp.dhis.web.ohie.fhir.webapi.EngineControllerDSTU2$ExecutionContextFHIR")) {
	throw new Error("Invalid dhisScriptContext");
    }
    id = dhisScriptContext.getId();
    var resp = false;
    var chunks = id.split(/:/);
    var baseid = chunks[0];
    switch (baseid) {
    case 'dataElements':
    case 'categoryOptions':
    case 'options':
    case 'organisationUnitLevels':
    case 'organisationUnitGroups':
    case 'trackedEntityAttributes':
    case 'programTrackedEntityAttributes':
    case 'programDataElements':
    case 'attributes':
    case 'programs':
    case 'dataElementGroups':
	var metadata = new Metadata(dhisScriptContext);   
	var schema = baseid;
	var StringUtils = Java.type("org.apache.commons.lang.StringUtils");
	var displayName = StringUtils.splitByCharacterTypeCamelCase(schema);
	var matches = metadata.retrieveBySchema(schema,false,"json");
	throw new Error("Blubber");
	resp = metadata.identifiableObjectToCodeSystem(metadata[schema],schema,displayName);
	break;

    case 'categories':
	var schema = baseid;
	var s_id = chunks[1];
	var metadata = new MetadataFHIR(dhisScriptContext);   
	var matches = metadata.retrieveBySchema(schema,s_id,"json");
	resp = metdata.toValueSet(matches,schema,"categoryOptions");
	break;
    default:
	break;
    }
    if (! resp) {
	throw new ErrorResourceNotFound("Terminology " + id + " was not found");
    }
    dhisScriptContext.setResponse(resp);
}



try {
    resp = processRead(dhisScriptContext);
} catch (e) {
    if (e instanceof ErrorResourceNotFound) {
	dhisScriptContext.setErrorMessage("Resource Not Found Error:" + e.message);
	dhisScriptContext.setErrorCode(400);
    } else if (e instanceof ErrorProcessing) {
	dhisScriptContext.setErrorMessage("Internal Procesing Error:" + e.message);
	dhisScriptContext.setErrorCode(500);
    } else if (  e instanceof TypeError) {
	dhisScriptContext.setErrorMessage("Java Type Error: " + e.message + "@" + e.lineNumber + "," + e.columnNumber + "\n" + e.stack);
	dhisScriptContext.setErrorCode(500);
    } else if (  e instanceof ErrorDHIS) {
	dhisScriptContext.setErrorMessage("DHIS Processing Error: " + e.message );
	dhisScriptContext.setErrorCode(500);
    } else {
	dhisScriptContext.setErrorMessage("Unknown Error: " + e.message );
	dhisScriptContext.setErrorCode(500);
    }
}
