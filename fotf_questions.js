
// the widget definition, where "orchestrate" is the namespace,
// "fotf_questions" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.fotf_questions", {
	// default options
	options: {
		is_country_state_toggle : false
		, disabled : false
		, is_portal : false
		, is_validate : true
		, single_error_place : false
	},

	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;
		
		// cache commonly used elements
		this.form_elem = $(this.element);

		// adds error-placement layer if using single error placement
		if (opts.single_error_place) {
			this.form_elem.prepend('<div class="error-placement" id="error-placement_' +
															this.form_elem.attr('id') 
															+'" style="display:none"><ul></ul></div>');
		}
		// transfer identifier to input
		if (this.form_elem.data('id') > 0) {
			var elem = '<input type="hidden" name="id" value="' 
									+ parseInt(this.form_elem.data('id')) + '" />';
			this.form_elem.append(elem);
		}

		// cache commonly used elements
		this._cacheElements();

		if (opts.disabled) {
			// disabled all
			this._disableAll();
		} else {
			// masking
			this._inputMasking();

			if (opts.is_validate) {
				// validates
				this._validation();
			} else {
				//remove required class
				this.cached['.input_required'].removeClass('required');
				//but retain asterix
				this._addAsterix();
			}
		}
		
		// init-type for dropdown
		this._preInitDropdown();
		
		// bind UI actions
		this._bindUIActions();
		
		// refresh
		this._refresh();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},

	_disableAll: function() {
		var cached = this.cached,
				opts = this.options;
		cached['field_all'].attr('disabled', 'disabled');
		cached['.link_action'].remove();
		cached['.button_action'].attr('disabled', false);
	},

	_inputMasking: function() {
		var cached = this.cached,
				opts = this.options;
		cached['.input_mask_fulldate'].mask('99/99/9999',{placeholder:'MM/DD/YYYY'});
		cached['.input_mask_year'].mask('9999',{placeholder:'YYYY'});
		cached['.input_mask_zip'].mask('00000-000');
		cached['.input_mask_gpa'].mask('9.99');
		var mask = 0;
		cached['.input_mask_numeric'].each(function(index, el) {
			mask = Array($(el).prop('maxlength') + 1).join('0');
			$(el).mask(mask);
		});
		cached['.input_mask_long_numeric'].mask('999999999999');
		cached['.input_mask_absolute_phone_us'].mask('999-999-9999');
	},
	
	_bindPhoneUSInternationalToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		cached['.input_checkbox_phone_international'].each(function(index, el) {
			if ($(el).prop('checked')) {
				$(el).prev('input').removeClass('mask-phone_us')
				$(el).prev('input').addClass('mask-phone_international')
			} else {
				$(el).prev('input').addClass('mask-phone_us')
				$(el).prev('input').removeClass('mask-phone_international')
			}
			self._phoneMasking();
		});

		cached['.input_checkbox_phone_international'].change(function(event) {
			/* Act on the event */
			if ($(this).prop('checked')) {
				$(this).prev('input').removeClass('mask-phone_us')
				$(this).prev('input').addClass('mask-phone_international')
			} else {
				$(this).prev('input').addClass('mask-phone_us')
				$(this).prev('input').removeClass('mask-phone_international')
			}
			self._phoneMasking();
		});
	}, 
	
	_bindDropdownToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		$('input.question-field-toggle').each(function(index, el) {
			var value = $(el).val();
			var parent = $(el).parent('tr');
			var next_1   = parent.next('tr');
			var next_2   = next_1.next('tr');
			var field_toggle_text = next_2.children('.question-field-toggle-text');
			if (value == -1) {
				field_toggle_text.show();
			} else {
				field_toggle_text.hide();
			}
		});

		$('input.question-field-toggle').change(function(event) {
			var value = $(this).val();
			var parent = $(this).parent('tr');
			var next_1   = parent.next('tr');
			var next_2   = next_1.next('tr');
			var field_toggle_text = next_2.children('.question-field-toggle-text');
			if (value == -1) {
				field_toggle_text.show();
			} else {
				field_toggle_text.hide();
			}
		});
	}, 

	_bindTextAreaWordCount: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		$('textarea.word-count').each(function(index, el) {
				//console.log($(el).attr('id'));
				var pTempContent = $('#' + $(el).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(el).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
		
		$('textarea.word-count').keyup(function(event) {
				var pTempContent = $('#' + $(this).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(this).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
		
		$('textarea.word-count').keydown(function(event) {
				var pTempContent = $('#' + $(this).attr('id') + '_count');
				if (pTempContent) pTempContent.html("0");
				// start counting
				var pText = trim($(this).val());
				var stripText = pText.replace(/(<([^>]+)>)/ig,"")
															.replace(/<\/?[^>]+>/g, "")
															.replace(/(\r\n|\n|\r)/gm," ")
															.replace(/(&nbsp;)/g," ")
															.replace(/  +/g, " ")
															.replace("&nbsp;"," ")
															.replace(/^[\s(&nbsp;)]+/g,"")
															.replace(/[\s(&nbsp;)]+$/g,"");
				var pCount = stripText.split(" ").length
				if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
					if (pTempContent) pTempContent.html("0");
				} else {
					if (pTempContent) pTempContent.html(pCount);
				}
		});
	}, 

	_bindCountryStateToggle: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;

		var country = cached['table'].find('input[type=hidden].country-toggle');
		country.each(function(index, el) {
			country = $(el);
			if ( country.val() == 201) {
				if (country.data('select-state')) {
					$('#' + country.data('select-state')).addClass('required');
					$('#' + country.data('select-state')).parent('td').show();
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.find('span.required-asterix')
						.show();
					$('#' + country.data('textbox-state')).removeClass('required');
					$('#' + country.data('textbox-state')).parent('td').hide();
					
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('span.required-asterix')
						.show();

					if (opts.is_validate) {
						$('#' + country.data('select-state'))
							.closest('tr.required')
							.next('tr.required')
							.find('input.mask-zip')
							.addClass('required');
					}
				}
			} else {
				if (country.data('select-state').length > 0) {
					$('#' + country.data('select-state')).removeClass('required');
					$('#' + country.data('select-state')).parent('td').hide();
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.find('span.required-asterix')
						.hide();
					$('#' + country.data('textbox-state')).removeClass('required');
					$('#' + country.data('textbox-state')).parent('td').show();
					
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('span.required-asterix')
						.hide();
					if (opts.is_validate) {
						$('#' + country.data('select-state'))
							.closest('tr.required')
							.next('tr.required')
							.find('input.mask-zip')
							.removeClass('required');
					}
				}
			}
		});

		$('select.country-toggle').change(function(event) {
			country = $('#hd_sel' + $(this).attr('id'));
			if ( country.val() == 201) {
				if (country.data('select-state')) {
					$('#' + country.data('select-state')).addClass('required');
					$('#' + country.data('select-state')).parent('td').show();
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.find('span.required-asterix')
						.show();
					$('#' + country.data('textbox-state')).removeClass('required');
					$('#' + country.data('textbox-state')).parent('td').hide();
					
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('span.required-asterix')
						.show();
					if (opts.is_validate) {
						$('#' + country.data('select-state'))
							.closest('tr.required')
							.next('tr.required')
							.find('input.mask-zip')
							.addClass('required');
					}
				}
			} else {
				if (country.data('select-state')) {
					$('#' + country.data('select-state')).removeClass('required');
					$('#' + country.data('select-state')).parent('td').hide();
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.find('span.required-asterix')
						.hide();
					$('#' + country.data('textbox-state')).removeClass('required');
					$('#' + country.data('textbox-state')).parent('td').show();
					
					$('#' + country.data('select-state'))
						.closest('tr.required')
						.next('tr.required')
						.find('span.required-asterix')
						.hide();
					if (opts.is_validate) {
						$('#' + country.data('select-state'))
							.closest('tr.required')
							.next('tr.required')
							.find('input.mask-zip')
							.removeClass('required');
					}
				}
			}
		});
	}, 

	_phoneMasking: function(el) {
		var cached = this.cached,
				opts = this.options;
		//this.element.find('input.mask-phone_us').mask('(999) 999-9999? x99999');
		this.element.find('input.mask-phone_us').mask('(000) 000-0000');
		//this.element.find('input.mask-phone_international').mask('+99 99 9999 9999');
		this.element.find('input.mask-phone_international').mask('(00) 0000-0000');
	},

	_addAsterix: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	

		cached['.required']
											.children('td :first-child')
											.append('<span class="required-asterix">&nbsp;'
											+'<font color=red>*</font></span>');
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	
		
		
		/* style */
		cached['table'].find('label.error').css('color', 'red');
		
		self._addAsterix();
		//validate setup differs from single container
		if (!opts.single_error_place) {
			self.form_elem.validate({
				ignore: ':hidden'
				, errorPlacement: function (er, el) {
					el.parent('td').append(er);
				}
				, submitHandler: function (form) {
					if ($(form).data('submit') == 'ajax') {
						var url = $(form).data('action');
						var data = new FormData($(form)[0]);
						$.ajax({
							url: url,
							cache: false,
							contentType: false,
							processData: false,
							type: 'POST',
							data: data,
							beforeSend : function () {
								$(form).parent().block({message:null});
							}
						})
						.done(function (data, textStatus, jqXHR) {
							$(form).parent().unblock();
							var json = $.parseJSON(data);
							if (parseInt(json.status) == 1) {
								$(form).parent().block({message:json.message, timeout: 500});
							} else {
								$(form).parent().block({message:textStatus + '.., but ' 
									+ json.message, timeout: 500});
							}
						})
						.fail(function (jqXHR, textStatus, errorThrown) {
							$(form).parent().unblock();
							$(form).parent().block({message:textStatus, timeout: 500});
						});
					} else {
						form.submit();
					}
				}
			});
		} else {
			self.form_elem.validate({
				ignore: ':hidden'
				, errorContainer: '#error-placement' + '_' + self.form_elem.attr('id')
				, errorLabelContainer: '#error-placement' 
																+ '_' + self.form_elem.attr('id') + ' ul'
				, wrapper: 'li'
				, submitHandler: function (form) {
					self.form_elem.find('.error-placement').removeClass('error');
					if ($(form).data('submit') == 'ajax') {
						var url = $(form).data('action');
						var data = new FormData($(form)[0]);
						$.ajax({
							url: url,
							cache: false,
							contentType: false,
							processData: false,
							type: 'POST',
							data: data,
							beforeSend : function () {
								$(form).parent().block({message:null});
							}
						})
						.done(function (data, textStatus, jqXHR) {
							$(form).parent().unblock();
							var json = $.parseJSON(data);
							if (parseInt(json.status) == 1) {
								$(form).parent().block({message:json.message, timeout: 500});
							} else {
								$(form).parent().block({message:textStatus + '.., but ' 
									+ json.message, timeout: 500});
							}
						})
						.fail(function (jqXHR, textStatus, errorThrown) {
							$(form).parent().unblock();
							$(form).parent().block({message:textStatus, timeout: 500});
						});
					} else {
						form.submit();
					}
				}
			});
		}
		
		if (opts.is_portal) {
			cached['.portal_input_required'].each(function(index, el) {
				$(el).rules("add", { 
				  required:true
				});
			});
		}

		/* common email */
		cached['.input_common_email'].each(function(index, el) {
			$(el).rules('add'
					, {email : true}
			);
		});
		
		/* file upload */
		cached['.input_upload'].each(function(index, el) {
			$(el).rules('add'
					, {
						extension : $(el).data('ext')
						, messages : {
							extension : 'Valid file format ' + $(el).data('ext')
						}
					}
			);
		});
		
		/* fulldate */
		cached['.input_validate_fulldate'].each(function(index, el) {
			$(el).rules('add'
					, {
						dateExt : true
					}
			);
		});
		
		/* rangedate */
		cached['.input_validate_rangedate'].each(function(index, el) {
			if ($(el).data('greater') != '') {
				var label = $('#' + $(el).data('greater'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();
				
				$(el).rules('add'
						, {
							greaterThan : ['#' + $(el).data('greater'), label]
						}
				);
			}
			else if ($(el).data('less') != '') {
				var label = $('#' + $(el).data('less'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();
				
				$(el).rules('add'
						, {
							lesserThan : ['#' + $(el).data('less'), label]
						}
				);
			}
		});
		
		/* rangedate - with time */
		cached['.input_validate_rangedate_time'].each(function(index, el) {
			if ($(el).data('greater') != '') {
				var label = $('#' + $(el).data('greater'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();
				
				$(el).rules('add'
						, {
							greaterThanWithTime : ['#' + $(el).data('greater'), label]
						}
				);
			}
			else if ($(el).data('less') != '') {
				var label = $('#' + $(el).data('less'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();
				
				$(el).rules('add'
						, {
							lesserThanWithTime : ['#' + $(el).data('less'), label]
						}
				);
			}
		});
		
		cached['.input_transcript'].each(function(index, el) {
			$(el).rules('add'
					, {
						extension : 'pdf|doc|docx|jpg|jpeg|png'
						, messages : {
							extension : 'Valid file format pdf|doc|docx|jpg|jpeg|png'
						}
					}
			);
		});
		
		cached['.input_resume'].each(function(index, el) {
			$(el).rules('add'
					, {extension : 'pdf|doc|docx'
						, messages : {
							extension : 'Valid file format pdf|doc|docx'
						}
					}
			);
		});
		
		/* gpa */
		cached['.input_gpa'].each(function(index, el) {
			$(el).rules('add'
					, {gpa : true}
			);
		});
		
		/* numeric */
		cached['.input_numeric'].each(function(index, el) {
			$(el).rules('add'
					, {number : true}
			);
		});
		
		/* long_numeric */
		cached['.input_long_numeric'].each(function(index, el) {
			$(el).rules('add'
					, {number : true}
			);
		});

		/* email */
		cached['.input_email'].each(function(index, el) {
			if ($(el).prop('placeholder') != '') {
				$(el).rules('add'
									, {
										email : true,
										contain_placeholder : true,
						 				remote: {
												url: "ajax/ajax_email_ssn_jquery_validation.asp",
												url: "ajax/ajax_email_ssn_jquery_validation.asp",
												type: "post",
												data: {
												applicantID: function() {
													return $(el).data('applicantid');
												}, 
												type: function() {
													return $(el).data('type');
												}
											}
										}
										, messages : {
											remote : 'Email Already Taken'
										}
									}
				);
			} else {
				$(el).rules('add'
									, {
										email : true,
						 				remote: {
												url: "ajax/ajax_email_ssn_jquery_validation.asp",
												url: "ajax/ajax_email_ssn_jquery_validation.asp",
												type: "post",
												data: {
												applicantID: function() {
													return $(el).data('applicantid');
												}, 
												type: function() {
													return $(el).data('type');
												}
											}
										}
										, messages : {
											remote : 'Email Already Taken'
										}
									}
				);
			}
		});

		/* email no remote */
		cached['.input_email_no_remote'].each(function(index, el) {
			$(el).rules('add'
								, {
									email : true
								}
			);
		});
	
		/* sql year */
		cached['.input_sql_year'].each(function(index, el) {
				$(el).rules('add'
					, {
						sql_year : true
					}
				);
		});
		
		/* password */
		cached['.input_password'].each(function(index, el) {
			var confirm = $(el).data('match');
			if (confirm.indexOf('confirm_confirm_') < 0) {
				//primary
				$(el).rules('add'
									, {
										minlength : 6,
										orch_password : true,
										equalTo : '#' + confirm
									}
				);
			} else {
				var origin = confirm.replace('confirm_confirm_', '');
				//secondary
				$(el).rules('add'
									, {
										minlength : 6,
										orch_password : true,
										equalTo : '#' + origin
									}
				);
			}
		});
		
		/* console password */
		cached['.input_console_password'].each(function(index, el) {
			var confirm = $(el).data('match');
			if (confirm.indexOf('confirm_confirm_') < 0) {
				//primary
				$(el).rules('add'
									, {
										required : true,
										equalTo : '#' + confirm
									}
				);
			} else {
				var origin = confirm.replace('confirm_confirm_', '');
				//secondary
				$(el).rules('add'
									, {
										required : true,
										equalTo : '#' + origin
									}
				);
			}
		});
	},
	
	/**
	 * _preInitDropdown : add pre init value for dropdown
	 */
	_preInitDropdown: function() {
		var cached = this.cached,
				opts = this.options;
		
		//dropdown pre-init
		cached['.fotf_dropdown'].each(function(index, el) {
			var id = 'hd_sel' + $(el).attr('name');
			var pre_label_value = 'Please Select';
			if ($(el).data('pre-label-value') != '') {
				pre_label_value = $(el).data('pre-label-value');
			}
			var pre_init_dropdown = '<option value="" selected="selected">' +
															pre_label_value + '</option>';
			
			if ($(el).data('pre-init')) {
				$(el).prepend(pre_init_dropdown);
			}
		});
	},
	
	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var cached = this.cached,
				opts = this.options;
		
		//placeholder
		cached['.input_validate_placeholder'].focusin(function(event) {
			if (!$(this).val() || $(this).val() == '') {
				$(this).val($(this).prop('placeholder'));
				$(this).get(0).setSelectionRange(0,0);
			}
		});
		
		//radio
		cached['.fotf_radio'].change(function(event) {
			var id = 'hd_rad' + $(this).attr('name')
			$('#' + id).val($(this).val()).trigger('change');
		});
		
		//checkbox
		cached['.fotf_checkbox'].change(function(event) {
			var id = 'hd_chk' + $(this).attr('name');
			if ($(this).prop('checked')) {
				$('#' + id).val(1).trigger('change');
			} else {
				$('#' + id).val(0).trigger('change');
			}
		});
		
		//dropdown
		cached['.fotf_dropdown'].change(function(event) {
			var id = 'hd_sel' + $(this).attr('name')
			$('#' + id).val($(this).val()).trigger('change');
		});

		if (opts.is_portal) {
			$('select.fotf_dropdown').dropdown();
		}
		
		//dropdown
		cached['.input_dropdown_addition'].each(function(index, el) {
			var trigger = $(el).data('trigger');
			if ($('#' + trigger).val() && $('#' + trigger).val() == -1) {
				$(el).show();
			} else {
				$(el).hide();
			}

			$('#' + trigger).change(function(event) {
				if ($(this).val() && $(this).val() == -1) {
					$(el).show();
				} else {
					$(el).hide();
				}
				$(el).removeClass('error');
				$(el).next('label').html('');
			});
		});
		
		//dropdown alternate multiple
		//adv_query.js required
		if(cached['.group_dropdown_multiple_alternate'].length > 0) {
			cached['.group_dropdown_multiple_alternate'].adv_query();
		}

		if (opts.is_portal) {
			$('select.fotf_dropdown').dropdown();
		}
		
		//us / international textbox and checkbox
		this._bindPhoneUSInternationalToggle();
		
		//generic dropdown toggle
		this._bindDropdownToggle();
		
		//text area word count
		this._bindTextAreaWordCount();

		if (opts.is_country_state_toggle) {
			//country state toggle, there's difference on flat ui, turn this off
			this._bindCountryStateToggle();
		}
	},

	// _setOptions is called with a hash of all options that are changing
	// always refresh when changing options
	_setOptions: function() {
		// _super and _superApply handle keeping the right this-context
		this._superApply( arguments );
		this._refresh();
	},

	// _setOption is called for each individual option that is changing
	_setOption: function( key, value ) {
		this._super( key, value );
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $table = this.form_elem.children('table')
				, $field_all = $table.find('input, select, textarea')
				, $button_action = $table.find('.button-action')
				, $link_action = $table.find('.link-action')
				, $required = $table.find('tr.required')
				, $input_required = $table.find('input.required, select.required, textarea.required')
				, $portal_input_required = $table.find('input.input_required, select.input_required')
				, $input_validate_placeholder = $table.find('input.validate_placeholder')
				, $input_password = $table.find('input.validate-password')
				, $input_console_password = $table.find('input.validate-console_password')
				, $input_sql_year = $table.find('input.validate-sql_year')
				, $input_email = $table.find('input.validate-email')
				, $input_email_no_remote = $table.find('input.validate-email-no-remote')
				, $input_common_email = $table.find('input.validate-common_email')
				, $input_gpa = $table.find('input.validate-gpa')
				, $input_numeric = $table.find('input.validate-numeric')
				, $input_long_numeric = $table.find('input.validate-long_numeric')
				, $input_upload = $table.find('input.validate-upload')
				, $input_transcript = $table.find('input.validate-transcript')
				, $input_resume = $table.find('input.validate-resume')
				, $input_validate_fulldate = $table.find('input.validate-fulldate')
				, $input_validate_rangedate = $table.find('input.validate-rangedate')
				, $input_validate_rangedate_time = $table.find('input.validate-rangedate-time')
				, $fotf_radio = $table.find('.fotf_radio')
				, $fotf_checkbox = $table.find('.fotf_checkbox')
				, $fotf_dropdown = $table.find('select.fotf_dropdown')
				, $input_dropdown_addition = $table.find('.input_dropdown_addition')
				, $input_mask_fulldate = $table.find('input.mask-fulldate')
				, $input_mask_year = $table.find('input.mask-year')
				, $input_mask_zip = $table.find('input.mask-zip')
				, $input_mask_gpa = $table.find('input.mask-gpa')
				, $input_mask_numeric = $table.find('input.mask-numeric')
				, $input_mask_long_numeric = $table.find('input.mask-long_numeric')
				, $input_mask_absolute_phone_us = $table.find('input.mask-absolute_phone_us')
				, $input_checkbox_phone_international = $table.find('input.checkbox-phone_international')
				, $group_dropdown_multiple_alternate = $table.find('tbody.dropdown-multiple-alternate');
		
		this.cached = {
			'table' : $table
			, 'field_all' : $field_all
			, '.link_action' : $link_action
			, '.button_action' : $button_action
			, '.required' : $required
			, '.input_required' : $input_required
			, '.portal_input_required' : $portal_input_required
			, '.input_validate_placeholder' : $input_validate_placeholder
			, '.input_password' : $input_password
			, '.input_console_password' : $input_console_password
			, '.input_sql_year' : $input_sql_year
			, '.input_email' : $input_email
			, '.input_email_no_remote' : $input_email_no_remote
			, '.input_common_email' : $input_common_email
			, '.input_gpa' : $input_gpa
			, '.input_numeric' : $input_numeric
			, '.input_long_numeric' : $input_long_numeric
			, '.input_upload' : $input_upload
			, '.input_transcript' : $input_transcript
			, '.input_resume' : $input_resume
			, '.input_validate_fulldate' : $input_validate_fulldate
			, '.input_validate_rangedate' : $input_validate_rangedate
			, '.input_validate_rangedate_time' : $input_validate_rangedate_time
			, '.fotf_radio' : $fotf_radio
			, '.fotf_checkbox' : $fotf_checkbox
			, '.fotf_dropdown' : $fotf_dropdown
			, '.input_dropdown_addition' : $input_dropdown_addition
			, '.input_mask_fulldate' : $input_mask_fulldate
			, '.input_mask_year' : $input_mask_year
			, '.input_mask_zip' : $input_mask_zip
			, '.input_mask_gpa' : $input_mask_gpa
			, '.input_mask_numeric' : $input_mask_numeric
			, '.input_mask_long_numeric' : $input_mask_long_numeric
			, '.input_mask_absolute_phone_us' : $input_mask_absolute_phone_us
			, '.input_checkbox_phone_international' : $input_checkbox_phone_international
			, '.group_dropdown_multiple_alternate' : $group_dropdown_multiple_alternate
		};
	}
});

/** extension **/

$.widget( "orchestrate.fotf_adv_query_questions", $.orchestrate.fotf_questions, {
	
	_addCountry: function(pObjName) {
		popup('/console/include/country_list.asp?objName='+pObjName, 600, 250) 
	},

	_addState : function(pObjName)
	{
		popup('/console/include/state_list.asp?objName='+pObjName, 600, 250) 
	},
	
	_addClassLevels : function(pObjName)
	{
		popup('/console/include/classlevels_list.asp?objName='+pObjName, 600, 250) 
	},

	_removeOptions : function(pObjName)
	{
		if (pObjName != '') {
			var val = $('#' + pObjName).val();
			if (val) {
				$.each(val, function(index, val) {
					$('#' + pObjName + ' option[value=' + val + ']').remove();
				});
			} else {
				//console.log('removeOptions : do nothing');
			}
		} else {
			//console.log('removeOptions : pObjName not found');
		}
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;	
		
		
		/* style */
		cached['table'].find('label.error').css('color', 'red');
		
		self.form_elem.validate({

		});
		
		$('.input_greater_less').rules("add", { 
			required_on_click:true
		});
	},

	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var self = this,
				cached = this.cached,
				opts = this.options;
		
		//radio
		cached['.fotf_radio'].change(function(event) {
			var id = 'hd_' + $(this).attr('name')
			$('#' + id).val($(this).val());
		});
		
		//checkbox
		cached['.fotf_checkbox'].change(function(event) {
			var id = 'hd_' + $(this).attr('name');
			if ($(this).prop('checked')) {
				$('#' + id).val(true);
			} else {
				$('#' + id).val(false);
			}
		});
		
		//dropdown
		cached['.fotf_dropdown'].change(function(event) {
			var id = 'hd_' + $(this).attr('name')
			$('#' + id).val($(this).val());
		});

		//us / international textbox and checkbox
		this._bindPhoneUSInternationalToggle();
		
		if (opts.is_country_state_toggle) {
			//country state toggle, there's difference on flat ui, turn this off
			this._bindCountryStateToggle();
		}

		//country
		this.form_elem.find('.btn-add_country').each(function(index, el) {
			$(el).click(function(event) {
				event.preventDefault();
				var elem = $(this).data('object-name');
				self._addCountry(elem);
			});
		});

		//state
		this.form_elem.find('.btn-add_state').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._addState(elem);
			});
		});
		
		//class levels
		this.form_elem.find('.btn-add_classlevels').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._addClassLevels(elem);
			});
		});
		
		//remove
		this.form_elem.find('.btn-remove').each(function(index, el) {
			$(el).click(function(event) {
				var elem = $(this).data('object-name');
				self._removeOptions(elem);
			});
		});
	},
});