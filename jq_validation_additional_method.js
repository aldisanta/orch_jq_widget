/*
Index of Class
 */

//custom class name
jQuery.validator.addClassRules({
	input_greater_less: {
		required_on_click : true
	},
});

jQuery.validator.addMethod(
	"dateExt",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		if( re.test(value)){
			var adata = value.split('/');
			var gg = parseInt(adata[1],10);
			var mm = parseInt(adata[0],10);
			var aaaa = parseInt(adata[2],10);
			var xdata = new Date(aaaa,mm-1,gg);
			if ( ( xdata.getFullYear() < 1900 || xdata.getFullYear() > 2079 ) ) {
				check = false;
			}
			else if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) ) {
				check = true;
			}
			else {
				check = false;
			}
		} else
			check = false;
		return this.optional(element) || check;
	}, 
	"Please enter a correct date"
);

$.validator.addMethod(
	"sql_year",
	function(value, element) {
		var check = false;
		var year = parseInt(value);
		if (year < 1900 || year > 2079) {
			check = false;
		} else {
			check = true;
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

jQuery.validator.addMethod("orch_password", function( value, element ) {
	return this.optional(element) || value.length >= 6 && /\d/.test(value) 
	&& /[a-z]/i.test(value);
}, "at least 6 char and contain at least one number and one character.");

jQuery.validator.addMethod("maxwords150", function(value, element, params) {
	if (value == "") {
		return true;
	} else {
		var stripText = value.replace(/(<([^>]+)>)/ig,"")
										.replace(/<\/?[^>]+>/g, "")
										.replace(/(\r\n|\n|\r)/gm," ")
										.replace(/(&nbsp;)/g," ")
										.replace(/  +/g, " ")
										.replace("&nbsp;"," ")
										.replace(/^[\s(&nbsp;)]+/g,"")
										.replace(/[\s(&nbsp;)]+$/g,"");
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
		var stripText = value
										.replace(/(<([^>]+)>)/ig,"")
										.replace(/<\/?[^>]+>/g, "")
										.replace(/(\r\n|\n|\r)/gm," ")
										.replace(/(&nbsp;)/g," ")
										.replace(/  +/g, " ")
										.replace("&nbsp;"," ")
										.replace(/^[\s(&nbsp;)]+/g,"")
										.replace(/[\s(&nbsp;)]+$/g,"");
		var pCount = stripText.split(" ").length
		if (pCount > 500) {
			return false;
		} else {
			return true;
		}
	}
}, "This field cannot exceed 500 words");

jQuery.validator.addMethod("required_on_click", 
	function(value, element, params) {
	console.log(value);
	if (value) {
		return true;
	} else {
		var check = $(element)
								.closest('tr').children('td:first')
															.children('input[type=radio]');
		if ($(check).prop('checked')) {
			if (value == '') {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}, "This field is required");

jQuery.validator.addMethod("valid_between", function(value, element, params) {
	if (value) {
		if ($(element).data('range') == 'start') {
			if ($(element).next('input').val() < value) {
				return false;
			} else {
				return true;
			}
		} else if ($(element).data('range') == 'end') {
			if ($(element).prev('input').val() > value) {
				return false;
			} else {
				return true;
			}
		} else {
			//nothing
		}
	} else {
		//nothing
	}
}, "This field is required");

jQuery.validator.addMethod("contain_placeholder", function(value, element, params) {
	if (value) {
		if (value.indexOf($(element).prop('placeholder')) < 0) {
			return false;
		} else {
			var tmp = value.split('@');
			if ('@' + tmp[1] != $(element).prop('placeholder')) {
				return false;
			} else {
				return true;
			}
		}
	} else {
		//nothing
	}
}, "Enter Stanford Edu Email");

jQuery.validator.addMethod("greaterThan", 
function(value, element, params) {
	if (!validateUSSmallDate(value)) {
		return false;
	}
	
	if (/Invalid/.test(new Date(value))) {
		return false;
	}

	if (!/Invalid|NaN/.test(new Date(value))) {
			return new Date(value) > new Date($(params[0]).val());
	}
	
	return isNaN(value) && isNaN($(params[0]).val()) 
			|| (Number(value) > Number($(params[0]).val())); 
	
},'Date is Invalid or Must be greater than {1}');

jQuery.validator.addMethod("lesserThan", 
function(value, element, params) {
	if (!validateUSSmallDate(value)) {
		return false;
	}

	if (/Invalid/.test(new Date(value))) {
		return false;
	}

	if (!/Invalid|NaN/.test(new Date(value))) {
			return new Date(value) < new Date($(params[0]).val());
	}

	return isNaN(value) && isNaN($(params[0]).val()) 
			|| (Number(value) < Number($(params[0]).val())); 
	
},'Date is Invalid or Must be lesser than {1}');

