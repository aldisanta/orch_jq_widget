/*
Index of Class
 */

$.validator.messages.required = 'Required field';

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
			if ( ( xdata.getFullYear() < 1901 || xdata.getFullYear() > 2078 ) ) {
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
		if (year < 1901 || year > 2078) {
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


jQuery.validator.addMethod("greaterThanWithTime", 
function(value, element, params) {
	var hour = $('#' + element.id + '_hour').val();
	var minute = $('#' + element.id + '_minute').val();
	
	if (!validateUSSmallDate(value)) {
		return false;
	}
	
	if (/Invalid/.test(new Date(value))) {
		return false;
	}

	if (!/Invalid|NaN/.test(new Date(value))) {
		var comp_date = $(params[0]).val();	
		var comp_hour = parseInt($(params[0] + '_hour').val());	
		var comp_minute = parseInt($(params[0] + '_minute').val());	
		//split into year month day
		var regex = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
		if (!regex.test(value)) {
			return false;
		} else {
			var array_date = value.split(RegExp.$1);
			var day = parseInt(array_date[1],10);
			var month = parseInt(array_date[0],10);
			var year = parseInt(array_date[2],10);
		}

		if (!regex.test(comp_date)) {
			return false;
		} else {
			var array_date = comp_date.split(RegExp.$1);
			var comp_day = parseInt(array_date[1],10);
			var comp_month = parseInt(array_date[0],10);
			var comp_year = parseInt(array_date[2],10);
		}
		return new Date(year, month, day, 
										+ hour, minute) > new Date(comp_year, comp_month, comp_day,+
										comp_hour, comp_minute);
	}
	
	return isNaN(value) && isNaN($(params[0]).val()) 
			|| (Number(value) > Number($(params[0]).val())); 
	
},'Date is Invalid or Must be greater than {1}');

jQuery.validator.addMethod("lesserThanWithTime", 
function(value, element, params) {
	var hour = $('#' + element.id + '_hour').val();
	var minute = $('#' + element.id + '_minute').val();

	if (!validateUSSmallDate(value)) {
		return false;
	}

	if (/Invalid/.test(new Date(value))) {
		return false;
	}

	if (!/Invalid|NaN/.test(new Date(value))) {
		var comp_date = $(params[0]).val();	
		var comp_hour = parseInt($(params[0] + '_hour').val());	
		var comp_minute = parseInt($(params[0] + '_minute').val());	
		//split into year month day
		var regex = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
		if (!regex.test(value)) {
			return false;
		} else {
			var array_date = value.split(RegExp.$1);
			var day = parseInt(array_date[1],10);
			var month = parseInt(array_date[0],10);
			var year = parseInt(array_date[2],10);
		}

		if (!regex.test(comp_date)) {
			return false;
		} else {
			var array_date = comp_date.split(RegExp.$1);
			var comp_day = parseInt(array_date[1],10);
			var comp_month = parseInt(array_date[0],10);
			var comp_year = parseInt(array_date[2],10);
		}
		return new Date(year, month, day, 
										+ hour, minute) < new Date(comp_year, comp_month, comp_day,+
										comp_hour, comp_minute);
	}

	return isNaN(value) && isNaN($(params[0]).val()) 
			|| (Number(value) < Number($(params[0]).val())); 
},'Date is Invalid or Must be lesser than {1}');

jQuery.validator.addMethod("email_textarea", 
function(value, element, params) {
	var self = this;
	value = $.trim(value);
	if ((value).indexOf('\n') > -1) {
		var array = value.split('\n');
		var check = true
		$.each(array, function(index, val) {
			if (check) {
				check = self.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(val);		
			} else {
				return false;				
			}
		});
		if (check) {
			return true;
		}
	} else {
		return self.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);		
	}
},'Please enter a valid email address.');

jQuery.validator.addMethod("windows_compliance", 
function(value, element, params) {
	if (value.length > 0) {
		var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
		var rg2=/^\./; // cannot start with dot (.)
		var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
		var check = value;
		
		
		if (check.indexOf("fakepath") != -1) {
			// Chrome adds "c:\fakepath"
			check = check.replace(/C:\\fakepath\\/i, '');
		}
		
		return rg1.test(check) && !rg2.test(check) &&!rg3.test(check);
	} else {
		return true;
	}
},'Please remove invalid characters from your filename before upload (e.g. no slashes, colons, semi-colons or other special characters)');