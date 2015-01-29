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