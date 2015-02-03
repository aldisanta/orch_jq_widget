$.validator.addMethod(
	"sql_year",
	function(value, element) {
		var check = false;
		var year = parseInt(value);
		if (year > 1900) {
			check = true;
		} else {
			check = false;
		}
		return check;
	}, 
	"Please enter a correct year"
);

$.validator.addMethod(
	"gpa",
	function(value, element) {
		var gpa = parseFloat(value);
		if (gpa > 4.00) {
			return false;
		}
		else if (gpa < 0) {
			return false;
		}
		else {
			return true;
		}
	}, 
	"Please enter a gpa"
);

jQuery.validator.addMethod("password", function( value, element ) {
	return this.optional(element) || value.length >= 6 && /\d/.test(value) && /[a-z]/i.test(value);
}, "at least 6 char and contain at least one number and one character.");

jQuery.validator.addMethod("maxwords150", function(value, element, params) {
	if (value == "") {
		return true;
	} else {
		var stripText = value.replace(/(<([^>]+)>)/ig,"").replace(/<\/?[^>]+>/g, "").replace(/(\r\n|\n|\r)/gm," ").replace(/(&nbsp;)/g," ").replace(/  +/g, " ").replace("&nbsp;"," ").replace(/^[\s(&nbsp;)]+/g,"").replace(/[\s(&nbsp;)]+$/g,"");
		var pCount = stripText.split(" ").length
		if (pCount > 150) {
			return false;
		} else {
			return true;
		}
	}
}, "This field cannot exceed 150 words");

jQuery.validator.addMethod("maxwords500", function(value, element, params) {
	if (value == "") {
		return true;
	} else {
		var stripText = value.replace(/(<([^>]+)>)/ig,"").replace(/<\/?[^>]+>/g, "").replace(/(\r\n|\n|\r)/gm," ").replace(/(&nbsp;)/g," ").replace(/  +/g, " ").replace("&nbsp;"," ").replace(/^[\s(&nbsp;)]+/g,"").replace(/[\s(&nbsp;)]+$/g,"");
		var pCount = stripText.split(" ").length
		if (pCount > 500) {
			return false;
		} else {
			return true;
		}
	}
}, "This field cannot exceed 500 words");