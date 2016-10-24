function processRead(dhisScriptContext) {
    var id = false;
    if (!dhisScriptContext instanceof Java.type("org.hisp.dhis.web.ohie.fhir.webapi.EngineControllerFHIR$ExecutionContextFHIR")) {
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
    case 'relationshipTypes':   
	// CODE SYSTEM: WHAT SHOULD OR SHOULD NOT BE HERE.   THESE ARE FLAT LISTS WITH NO 
	// WITH NO RELATIONSHIP BETWEEN MEMBERS OF THIS LIST
    case 'trackedEntityAttributes':
    case 'programTrackedEntityAttributes':
    case 'programDataElements':
    case 'attributes':
    case 'programs':
    case 'dataElementGroups':
	var metadata = new Metadata(dhisScriptContext);   
	var schema = baseid;
	var StringUtils = Java.type("org.apache.commons.lang.StringUtils");
	var displayName = StringUtils.join(StringUtils.splitByCharacterTypeCamelCase(schema)," ");
	var matches = metadata.retrieveBySchema(schema,false,"json");
	throw new Error("Blubber");
	resp = metadata.identifiableObjectToCodeSystem(metadata[schema],schema,displayName);
	break;

    case 'categories':
	// VALUE SET: WHAT SHOULD OR SHOULD NOT BE HER.   THESE ARE SUBSETS 
	// IDENTIFIED OF THE CODE SYSTSEMS ABOVE OR OF OTHER CODE SYSTEMS
	var schema = baseid;
	var s_id = chunks[1];
	var metadata = new MetadataFHIR_STU3(dhisScriptContext);   
	var matches = metadata.retrieveBySchema(schema,s_id,"json");
	resp = metdata.toValueSet(matches,schema,"categoryOptions");
	break;

//    case 'XXXXXXX':
	// CONCEPT MAP: DESCRIBES RELATIONSHIPS BETWEEN MEMBERS OF TWO VALUE SETS 
	// RELATIONSHIPS INCLUDE: 
	//       equivalent | equal | wider | subsumes | narrower | specializes | inexact | unmatched | disjoint
	// SEE:
	//       https://www.hl7.org/fhir/valueset-concept-map-equivalence.html
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
