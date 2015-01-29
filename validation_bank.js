	$is_debug = false;

	function showQuestionHelp(pLyr){
		$("#" + pLyr).toggle("slow");
	}
	
	function validationBank_TextBox(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pObj.length > 0) {
			if (pRequired == "1") {
				if (trim(pObj.val()) == "") {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				if (pObj.val() == "") {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.removeClass("hint")
						//pRow.attr('class', 'form-row');
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_DropdownTextBox(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var obj_name1 = pObjName;
		var obj_name2 = pObjName
		
		if (obj_name1.indexOf('txt') > -1) {
			obj_name1 = obj_name1.replace('txt', 'txt_input');
		}
		var pObj	= $("#" + obj_name1);	
		
		if (obj_name2.indexOf('txt') > -1) {
			obj_name2 = obj_name2.replace('txt', '');
		}
		var pRow	= $("#row-" + obj_name2);

		var bValid = true;
		if (pObj.length > 0) {
			if (pRequired == "1") {
				if (trim(pObj.val()) == "") {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				if (pObj.val() == "") {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_DropdownTextBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_Email(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary email text box
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_Email');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_AlphaNumericTextBox(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isAlphaNumeric(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isAlphaNumeric(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_AlphaNumericTextBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_NumericTextBox(pObjName, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!IsNumeric2(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!IsNumeric2(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_NumericTextBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_NumericNoZero(pObjName, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "0" || trim(pObj.val()) == "00") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!IsNumeric2(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		} else {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "0" || trim(pObj.val()) == "00") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!IsNumeric2(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_NumericNoZero');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_URLTextBox(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!ValidURL(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 4 || pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!ValidURL(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_URLTextBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_ApplicantEmail(pObjName, pObjIDName, pRequired, pAction) {
		/*
			Function: Validate Email & check it with existing email (for register and update email)
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pObjID  = $("#" + pObjIDName);
		var pRow	= $("#row-" + pObjName);
		var pInvMsg	= $("#invalid-" + pObjName);
		var pCheck 	= $("#chk" + pObjName);
		pCheck.val("");
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_applicantEmail2.asp",
					  data: { id: trim(pObjID.val()), email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pInvMsg.html("Error: Your Applicant ID cannot be found.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "4") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: This e-mail address is associated to another applicant. Please enter a different e-mail address.");
							pRow.attr('class', 'form-row invalid');
							pCheck.val("notunique");
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_applicantEmail2.asp",
					  data: { id: trim(pObjID.val()), email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pInvMsg.html("Error: Your Applicant ID cannot be found.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "4") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: This e-mail address is associated to another applicant. Please enter a different e-mail address.");
							pRow.attr('class', 'form-row invalid');
							pCheck.val("notunique");
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_ApplicantEmail');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_Password(pObjName, pRequired, pAction) { 
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				var bValidPass = false;
				var vPass = trim(pObj.val());
				var reg = /^[^%\s]{6,}$/;
				var reg2 = /[a-zA-Z]/;
				var reg3 = /[0-9]/;
				bValidPass = reg.test(vPass) && reg2.test(vPass) && reg3.test(vPass);
				if (!bValidPass) {
					pInvMsg.html("Error: Password must be at least six (6) characters and should contain a letter and a numeric.");
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}		
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				var bValidPass = false;
				var vPass = trim(pObj.val());
				var reg = /^[^%\s]{6,}$/;
				var reg2 = /[a-zA-Z]/;
				var reg3 = /[0-9]/;
				bValidPass = reg.test(vPass) && reg2.test(vPass) && reg3.test(vPass);
				if (!bValidPass) {
					pInvMsg.html("Error: Password must be at least six (6) characters and should contain a letter and a numeric.");
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}	
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_Password');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_RevPassword(pObjName, pRequired, pAction) { 
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				var vPass = trim(pObj.val());
				if (vPass.length < 6) {
					if (pAction == 3) {
						bValid = false;
					}					
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				var vPass = trim(pObj.val());
				if (vPass.length < 6) {
					if (pAction == 3) {
						bValid = false;
					}					
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_RevPassword');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_RefPassword(pObjName, pRequired, pAction) { 
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				var vPass = trim(pObj.val());
				if (vPass.length < 6) {
					if (pAction == 3) {
						bValid = false;
					}					
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				var vPass = trim(pObj.val());
				if (vPass.length < 6) {
					if (pAction == 3) {
						bValid = false;
					}					
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_RefPassword');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_PasswordConfirmation(pObjName, pObjName2, pRequired, pAction) {
		pObj	= $("#" + pObjName);
		pVal	= trim($("#" + pObjName).val());
		pObj2	= $("#" + pObjName2);
		pVal2	= trim($("#" + pObjName2).val());
		pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (pVal != pVal2) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}	
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (pVal != pVal2) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}	
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_PasswordConfirmation');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_OldPassword(pObjName, pID, pRequired, pAction) { 
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);		
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( msg ) {
					if (msg == "1") {
						pRow.attr('class', 'form-row');
					} else if (msg == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( msg ) {
					if (msg == "1") {
						pRow.attr('class', 'form-row');
					} else if (msg == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_OldPassword');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_OldRevPassword(pObjName, pID, pRequired, pAction) { 
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);		
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentRevPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( data ) {
					if (data == "1") {
						pRow.attr('class', 'form-row');
					} else if (data == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentRevPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( data ) {
					if (data == "1") {
						pRow.attr('class', 'form-row');
					} else if (data == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		}
		
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_OldRevPassword');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_OldRefPassword(pObjName, pID, pRequired, pAction) { 
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);		
		var pRow	= $("#row-" + pObjName);
		pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentRefPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( data ) {
					if (data == "1") {
						pRow.attr('class', 'form-row');
					} else if (data == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_currentRefPass.asp",
				  data: { id: pID, pass: trim(pObj.val()) }
				}).done(function( data ) {
					if (data == "1") {
						pRow.attr('class', 'form-row');
					} else if (data == "2") {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		}
		
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_OldRefPassword');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_SelectBox(pObjName, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "0") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (pObj.val() == "") {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "0") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_SelectBox');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_DropDown (pObjName, pObjName2, pRequired, pAction) {
		var pObj	= $("#" + pObjName);
		var pRow	= $("#row-" + pObjName);
		var pReqMsg	= $("#required-" + pObjName2);
		var pFieldText = "";
		var bValid = true;
		if (pObj.length > 0) {
			if (pRequired == "1") {
				if ((trim(pObj.val()) == "") || (trim(pObj.val()) == "0")) {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {
			console.log(pObjName);
			console.log(pObjName2);
			console.log(pRequired);
			console.log(pAction);
			console.log('validationBank_DropDown');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_StateDropDown (pObjName, pObjName2, pObjCountry, pRequired, pAction) {
		var pObj	= $("#" + pObjName);
		var pRow	= $("#row-" + pObjName2);
		var pReqMsg	= $("#required-" + pObjName2);
		var pObjCountry	= $("#" + pObjCountry);
		var bValid = true;
		if (pRequired == "1") {
			if ((trim(pObjCountry.val()) == "201") || (trim(pObjCountry.val()) == "36")) {
				if (typeof(pObj.val()) == 'undefined' || (trim(pObj.val()) == "") || (trim(pObj.val()) == "0")) {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						console.log("#row-" + pObjName2);
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		} else {
			pRow.attr('class', 'form-row');
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_StateDropDown');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_SelectState(pObjName, pObjCountry, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName + "dropdown");	
		var pObj2	= $("#" + pObjName);
		var pObjCountry	= $("#" + pObjCountry);
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if ((trim(pObjCountry.val()) == "201") || (trim(pObjCountry.val()) == "36")) {
				if (trim(pObj.val()) == "" || trim(pObj.val()) == "0") {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			} else {
				if (pObj2.val() == "") {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "0" || trim(pObj2.val()) == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_SelectState');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_Phone(pObjName, pIntChk, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "___-___-____") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		} else {
			pRow.attr('class', 'form-row');
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_Phone');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_Phone2(pObjName, pIntChk, pRequired, pAction) {
		/*
			Function: Validate ordinary textbox / textarea
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "___-___-____") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if ($("input:checkbox[name=" + pIntChk + "]").is(':checked')) {
					pRow.attr('class', 'form-row');
				} else {
					if (trim(pObj.val()) != "" && trim(pObj.val()) != "___-___-____") {
						var valPhone = trim(pObj.val());
						if (valPhone.length != 12)  {
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							} 
						} else {
							if (!validateUSPhone(valPhone)) {
								pRow.attr('class', 'form-row invalid');
								if (pAction == 4) {
									bValid = false;
								}
							} else {
								pRow.attr('class', 'form-row');
							}
						}
					} 
				}
			}
		} else {
			if (trim(pObj.val()) != "" && trim(pObj.val()) != "___-___-____") {
				if ($("input:checkbox[name=" + pIntChk + "]").is(':checked')) {
					pRow.attr('class', 'form-row');
				} else {
					var valPhone = trim(pObj.val());
					if (valPhone.length != 12)  {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						} 
					} else {
						if (!validateUSPhone(valPhone)) {
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pRow.attr('class', 'form-row');
						}
					}
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_Phone2');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_ApplicantEmail2(pObjName, pRequired, pAction) {
		/*
			Function: Validate Email & check it with existing email (for register and update email)
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_applicantEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_applicantEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_ApplicantEmail2');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_RadioButton(pObjName, pObjName2, pValue, pRequired, pAction) {
		/*
			Function: Validate radio button
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj		= $("#" + pObjName);
		var pRow		= $("#row-" + pObjName2);
		var bValid = true;
		if (pRequired == "1") {
			if (pObj.val() == pValue || pObj.val() == ''){
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (pObj.val() == pValue || pObj.val() == ''){
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (pObj.val() == pValue || pObj.val() == ''){
				pRow.removeClass("required");
				pRow.addClass("hint");
				//pRow.attr('class', 'form-row hint');
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_RadioButton');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_TextBoxValidation(pObjName, pValidText, pRequired, pAction) {
		/*
			Function: Validate textbox with validation text
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (pObj.val() != trim(pValidText)) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					} 
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		} else {
			if (trim(pObj.val()) != "") {
				if (pObj.val() != trim(pValidText)) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					} 
				} else {
					if (pObj.val() == "") {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else {
						pRow.attr('class', 'form-row');
					}
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextBoxValidation');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_CheckBoxes(pObjName, pRequired, pAction) {
		/*
			Function: Validate Checkboxes
			pAction - 1:Focus | 2:Focusout | 3:bind | 4:validation
		*/
		var pObj = $("#" + pObjName);
		var pRow	= "";
		if (pObjName.substring(0,5) == "chkQ_") {
			pRow	= $("#row-" + pObjName.replace("chk", ""));
		} else {
			pRow	= $("#row-" + pObjName);
		}
		var bValid = true;
		if (pRequired == "1") {
			if ($("[name='" + pObjName + "']:checked").length == 0) {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		} else {
			if ($("[name='" + pObjName + "']:checked").length == 0) {
				pRow.removeClass("required");
				pRow.addClass("hint");
				//pRow.attr('class', 'form-row hint');
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_CheckBoxes');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_TextBoxDate(pObjName, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:bind | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "" || trim(pObj.val()) == "--/--/----") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				var pDate = trim(pObj.val());
				if (!validateUSDate(pDate)) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (trim(pObj.val()) != "" && trim(pObj.val()) != "--/--/----") {
				var pDate = pObj.val();
				if (!validateUSDate(pDate)) {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextBoxDate');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_TextBoxDateRange(pObjName, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:bind | 4:validation
		*/
		var pObj		 = $("#" + pObjName + "_FROM");	
		var pObj2		 = $("#" + pObjName + "_TO");	
		var pRow		 = $("#row-" + pObjName);
		var pInvalidMsg	 = $("#invalid-" + pObjName);
		var bValid 		= true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") { 
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!validateUSDate(trim(pObj.val()))) { 
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}
				} else {
					if (trim(pObj2.val()) == '') { 
						if (pAction == 1) {
							pRow.removeClass("required");
							pRow.addClass("hint");
							//pRow.attr('class', 'form-row hint');
						} else if (pAction == 2) {
							if (pRow.attr('class') != "form-row required") 
								pRow.removeClass('required')
								//p+Row.attr('class', 'form-row');
						} else if (pAction == 3) {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
						} 
						if (pAction == 4) {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							bValid = false;
						}
					} else {
						if (!validateUSDate(trim(pObj2.val()))) { 
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else { 
							pRow.attr('class', 'form-row');
						} 
					}
				}
			}
			if (trim(pObj.val()) != '' && trim(pObj2.val()) != '' && validateUSDate(trim(pObj.val())) && validateUSDate(trim(pObj2.val()))) { 
				var dAppStart = new Date (trim(pObj.val())); 
				var dAppVirtual = new Date (trim(pObj2.val())); 									
				if (dAppVirtual < dAppStart ) { 
					pRow.attr('class', 'form-row invalid');
					if (pAction == 4) {
						bValid = false;
					}
				} 
				else { 
					pRow.attr('class', 'form-row');
				} 
			}
		} else {
			if ((trim(pObj.val()) != "") || (trim(pObj2.val()) != "")) { 
				if (trim(pObj.val()) == "") { 
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
					} 
					if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else {
					if (!validateUSDate(trim(pObj.val()))) { 
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					} else {
						if (trim(pObj2.val()) == '') { 
							if (pAction == 1) {
								pRow.removeClass("required");
								pRow.addClass("hint");
								//pRow.attr('class', 'form-row hint');
							} else if (pAction == 2) {
								if (pRow.attr('class') != "form-row required") 
									pRow.removeClass('required')
									//p+Row.attr('class', 'form-row');
							} else if (pAction == 3) {
								pRow.addClass('required')
								//p+Row.attr('class', 'form-row required');
							} 
							if (pAction == 4) {
								pRow.addClass('required')
								//p+Row.attr('class', 'form-row required');
								bValid = false;
							}
						} else {
							if (!validateUSDate(trim(pObj2.val()))) { 
								pRow.attr('class', 'form-row invalid');
								if (pAction == 4) {
									bValid = false;
								}
							} else { 
								pRow.attr('class', 'form-row');
							} 
						}
					}
				}
				if (trim(pObj.val()) != '' && trim(pObj2.val()) != '' && validateUSDate(trim(pObj.val())) && validateUSDate(trim(pObj2.val()))) { 
					var dAppStart = new Date (trim(pObj.val())); 
					var dAppVirtual = new Date (trim(pObj2.val())); 									
					if (dAppVirtual < dAppStart ) { 
						pRow.attr('class', 'form-row invalid');
						if (pAction == 3) {
							bValid = false;
						}
					} 
					else { 
						pRow.attr('class', 'form-row');
					} 
				}
			} else {
				pRow.removeClass("required");
				pRow.addClass("hint");
				//pRow.attr('class', 'form-row hint');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextBoxDateRange');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_DocumentUpload(pObjName, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj			= $("#" + pObjName);
		var pObj2			= $("#" + pObjName + "_DOC");
		var pObj3			= $("#" + pObjName + "_ORI");
		var pRow			= $("#row-" + pObjName);
		var bValid 		= true;
		if (pObj.length > 0) {
			if (pRequired == "1") {
				if ((trim(pObj.val()) != "") || (trim(pObj2.val()) != "")) {
					var sValDoc = trim(pObj2.val());
					if (sValDoc.substr(1,3) != "Ex~") {
						if (sValDoc != "" && sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "doc"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "docx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "pdf"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "rtf"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "txt"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "xls"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "xlsx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "ppt"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "pptx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "jpg"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "jpeg"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "png") {
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pRow.attr('class', 'form-row');
						}
					}
				} else {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} 
			} else {
				if (trim(pObj.val()) != "") {
					var sValDoc = trim(pObj2.val());
					if (sValDoc.substr(1,3) != "") {
						if (sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "doc"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "docx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "pdf"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "rtf"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "txt"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "xls"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "xlsx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "ppt"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "pptx"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "jpg"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "jpeg"
							&& sValDoc.substr(sValDoc.lastIndexOf(".") + 1,4).toLowerCase() != "png") {
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pRow.attr('class', 'form-row');
						}	
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} 
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_DocumentUpload');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_TextAreaWithCounter(pObjName, pCounter, pMaxWord, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj			= $("#" + pObjName);	
		var pRow			= $("#row-" + pObjName);
		var pTempContent	= $("#" + pCounter);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
				if (pTempContent) pTempContent.html("0");
			} else {
				// start counting
				var pText = trim(pObj.val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"").replace(/<\/?[^>]+>/g, "").replace(/(\r\n|\n|\r)/gm," ").replace(/(&nbsp;)/g," ").replace(/  +/g, " ").replace("&nbsp;"," ").replace(/^[\s(&nbsp;)]+/g,"").replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
				if ((pMaxWord > 0) && (pCount > pMaxWord)) {
					if (pAction == 4) {
						bValid = false;
					}
					if ($("#invcount_" + pObjName)) $("#invcount_" + pObjName).html(pCount);
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		} else {
			if (trim(pObj.val()) == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
				if (pTempContent) pTempContent.html("0");
			} else {
				pRow.attr('class', 'form-row');
				var pText = trim(pObj.val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"").replace(/<\/?[^>]+>/g, "").replace(/(\r\n|\n|\r)/gm," ").replace(/(&nbsp;)/g," ").replace(/  +/g, " ").replace("&nbsp;"," ").replace(/^[\s(&nbsp;)]+/g,"").replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
				if ((pMaxWord > 0) && (pCount > pMaxWord)) {
					if (pAction == 4) {
						bValid = false;
					}
					if ($("#invcount_" + pObjName)) $("#invcount_" + pObjName).html(pCount);
					pRow.attr('class', 'form-row invalid');
				} else {
					pRow.attr('class', 'form-row');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextAreaWithCounter');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_LateCode(pObjName, pID, pRequired, pAction) {
		/*
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				$.ajax({
				  type: "POST",
				  url: "/include/validate_LateCode.asp",
				  data: { code: trim(pObj.val()), id: pID }
				}).done(function( msg ) {
					if (msg == "1") {
						pRow.attr('class', 'form-row');
					} else {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 4) {
							bValid = false;
						}
					}
				});
			}
		} 
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_LateCode');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_ReviewerEmail(pObjName, pRequired, pAction) {
		/*
			Function: Validate Email & check it with existing email (for register and update email)
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_reviewerEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_reviewerEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_ReviewerEmail');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_ReferenceEmail(pObjName, pMode, pRequired, pAction) {
		/*
			Function: Validate Email & check it with existing email (for register and update email)
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var pInvMsg	= $("#invalid-" + pObjName);
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_referenceEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_referenceEmail.asp",
					  data: { email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: There is no account with this e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_ReferenceEmail');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_ReferenceEmail2(pObjName, pObjID, pMode, pAid, pRequired, pAction) {
		/*
			Function: Validate Email & check it with existing email (for register and update email)
			pAction - 1:Focus | 2:Focusout | 3:change | 4:validation
		*/
		var pObj	= $("#" + pObjName);	
		var pRow	= $("#row-" + pObjName);
		var pInvMsg	= $("#invalid-" + pObjName);
		var pID		= $("#" + pObjID).val();
		var bValid = true;
		if (pRequired == "1") {
			if (trim(pObj.val()) == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					if (pRow.attr('class') != "form-row required") 
						pRow.removeClass('required')
						//p+Row.attr('class', 'form-row');
				} else if (pAction == 3) {
					pRow.attr('class', 'form-row');
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_referenceEmail.asp",
					  data: { id: pID, mode: pMode, aid: pAid, email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: This email address is associated to an account. Please enter a different email address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		} else {
			if (pObj.val() == "") {
				if (pAction == 2) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			} else {
				if (!isValidEmail(trim(pObj.val()))) {
					if (pAction == 4) {
						bValid = false;
					}
					pInvMsg.html("Error: Please enter valid e-mail address.");
					pRow.attr('class', 'form-row invalid');
				} else {
					$.ajax({
					  type: "POST",
					  url: "/include/validate_referenceEmail.asp",
					  data: { id: pID, mode: pMode, aid: pAid, email: trim(pObj.val()) }
					}).done(function( msg ) {
						if (msg == "1") {
							pRow.attr('class', 'form-row');
						} else if (msg == "2") {
							pRow.addClass('required')
							//p+Row.attr('class', 'form-row required');
							if (pAction == 4) {
								bValid = false;
							}
						} else if (msg == "3") {
							pInvMsg.html("Error: Please enter valid e-mail address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						} else {
							pInvMsg.html("Error: This email address is associated to an account. Please enter a different email address.");
							pRow.attr('class', 'form-row invalid');
							if (pAction == 4) {
								bValid = false;
							}
						}
					});
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_ReferenceEmail2');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_DropDownMessageCenter (pObjName, pObjName2, pRequired, pAction, pOtherObjName) {
		var pObj	= $("#" + pObjName);
		var pOtherObj	= $("#" + pOtherObjName);
		var pRow	= $("#row-" + pObjName2);
		var pOtherRow	= $("#row-" + pOtherObjName);
		var pReqMsg	= $("#required-" + pObjName2);
		var pFieldText = "";
		var bValid = true;
		if (pObj.length > 0) {
			if (pRequired == "1") {
				if ((trim(pObj.val()) == "")) {
					if (pAction == 1) {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} else if (pAction == 2) {
						if (pRow.attr('class') != "form-row required") 
							pRow.removeClass('required')
							//p+Row.attr('class', 'form-row');
					} else if (pAction == 3) {
						pRow.attr('class', 'form-row');
					} else if (pAction == 4) {
						pRow.addClass('required')
						//p+Row.attr('class', 'form-row required');
						bValid = false;
					}
				} else if (trim(pObj.val()) == 0) {
					if ((trim(pOtherObj.val()))) {
						pRow.attr('class', 'form-row');
					} else {
						if (pAction == 1) {
							pOtherRow.attr('class', 'form-row hint');
						} else if (pAction == 2) {
							if (pOtherRow.attr('class') != "form-row required") 
								pOtherRow.attr('class', 'form-row');
						} else if (pAction == 3) {
							pOtherRow.attr('class', 'form-row');
						} else if (pAction == 4) {
							pOtherRow.attr('class', 'form-row required');
							bValid = false;
						}
					}
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				pRow.attr('class', 'form-row');
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_DropDownMessageCenter');
			console.log(bValid);
			}
			return bValid;
		}
	}
	
	function validationBank_TextBoxGPA(pObjName, pRequired, pAction) {
		var pObj	= $("#" + pObjName);
		var pRow	= $("#row-" + pObjName);
		var bValid = true;
		
		if (pRequired == "1") {
			if (pObj.val() == "") {
				if (pAction == 1) {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				} else if (pAction == 2) {
					//pRow.addClass('required')
					if (pRow.attr('class') != "form-row required") 
						pRow.attr('class', 'form-row');
					////p+Row.attr('class', 'form-row required');
				}  else if (pAction == 3) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row required');
					bValid = false;
				} else if (pAction == 4) {
					pRow.addClass('required')
					//p+Row.attr('class', 'form-row');
				} else {
					pRow.attr('class', 'form-row');
				}
			} else {
				var pGPA = pObj.val();
				if (!isNaN(pGPA)) {
					if (parseFloat(pGPA) < 0 || parseFloat(pGPA) > 4) {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 3) {
							bValid = false;
						}
						else if (pAction == 4) {
							pRow.addClass('required');
						} else {
							pRow.removeClass("required");
							pRow.addClass("hint");
							//pRow.attr('class', 'form-row hint');
						} 
					} else {
						pRow.attr('class', 'form-row');
					}
					/*bug : 3.33 == false
					if (!ValidGPA(pGPA)) {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 3) {
							bValid = false;
						} 
					} else {
					}
					/**/
				} else {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 3) {
						bValid = false;
					}
					else if (pAction == 4) {
						pRow.addClass('required');
					} else {
						pRow.removeClass("required");
						pRow.addClass("hint");
						//pRow.attr('class', 'form-row hint');
					} 
				}
			}
		} else {
			var pGPA = pObj.val();
			if (pGPA != "") {
				if (!isNaN(pGPA)) {
					if (parseFloat(pGPA) < 0 || parseFloat(pGPA) > 4) {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 3) {
							bValid = false;
						} 
					} else {
						pRow.attr('class', 'form-row');
					}
					/*
					if (!ValidGPA(pGPA)) {
						pRow.attr('class', 'form-row invalid');
						if (pAction == 3) {
							bValid = false;
						} 
					} else {
					}
					/**/
				} else {
					pRow.attr('class', 'form-row invalid');
					if (pAction == 3) {
						bValid = false;
					} 
				}
			} else {
				if (pAction == 4) {
					pRow.attr('class', 'form-row');
				} else {
					pRow.removeClass("required");
					pRow.addClass("hint");
					//pRow.attr('class', 'form-row hint');
				}
			}
		}
		
		if (pAction == 4) {
			if ($is_debug) {

			console.log('validationBank_TextBoxGPA');
			console.log(bValid);
			}
			return bValid;
		}
	}
