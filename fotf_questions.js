
// the widget definition, where "orchestrate" is the namespace,
// "fotf_questions" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.fotf_questions", {

	/**
	 * [public_bindTextAreaWordCount description]
	 */
	public_bindTextAreaWordCount: function() {
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

	// default options
	options: {
		is_ignore_hidden : true
		, is_country_state_toggle : false
		, disabled : false
		, is_portal : false
		, is_validate : true
		, single_error_place : false
		, notification_block : 'default'
	},

	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;


		this.form_elem = $(this.element);

		// change validation option based from no validate attribute
		if (this.form_elem.attr('novalidate') == 'novalidate') {
			opts.is_validate = false;
		}

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
				//TODO :
				//no validation running, but will retain ajax submit
			}
		}

		// init-type for dropdown
		this._preInitDropdown();

		// init radio group visibility
		this._radioParentOfGroupVisibility_Set();

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
		cached['.input_mask_color'].mask('\#');
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
		cached['.required'].each(function(index, el) {
			$(el).children('td').first()
						.append('<span class="required-asterix">&nbsp;'
						+'<font color=red>*</font></span>');

		});
	},

	_updateDialogFlagData: function(json) {
		var self = this
				, opts = self.options
				, cached = self.cached;

		if (json.row && json.row.length > 0) {
			$('#dialog-flag').data('row', json.row);
		}
		if (json.label && json.label.length > 0) {
			$('#dialog-flag').data('label', json.label);
		}
		if (json.fields && json.fields.length > 0) {
			$('#dialog-flag').data('fields', json.fields);
		}
		if (json.action && json.action.length > 0) {
			$('#dialog-flag').data('action', json.action);
		}
		$('#dialog-flag').val('finish').trigger('change');
	},

	/**
	 * _formSubmitHandler_Ajax:
	 */
	_formSubmitHandler_Ajax: function(form) {
		var self = this
				, opts = self.options
				, cached = self.cached;

		var url = $(form).data('action');
		var data = new FormData($(form)[0]);
		var ajax_options =
		{
			url: url,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data: data,
		};

		if (opts.notification_block == 'default') {
			ajax_options.beforeSend = function () {
				$(form).parent().block({message:null});
			}
		} else if (opts.notification_block == 'growl') {
			ajax_options.beforeSend = function () {
				$(form).parent().block({
					message: 'updating ....',
					fadeIn: 700,
					fadeOut: 700,
					timeout: 2000,
					showOverlay: false,
					centerY: false,
					css: {
							width: '350px',
							top: '10px',
							left: '',
							right: '10px',
							border: 'none',
							padding: '5px',
							backgroundColor: '#000',
							'-webkit-border-radius': '10px',
							'-moz-border-radius': '10px',
							opacity: .6,
							color: '#fff'
					}
				});
			}
		} else {
			ajax_options.beforeSend = function () {
				$(form).parent().block({message:null});
			}
		}

		var ajax = $.ajax(ajax_options);

		if (opts.notification_block == 'default') {
			//done ajax request
			ajax.done(function (data, textStatus, jqXHR) {
				$(form).parent().unblock();
				var json = $.parseJSON(data);
				if (parseInt(json.status) == 1) {
					$(form).parent().block({message:json.message, timeout: 500});

					//added toggle flag on dialog if exists
					if ($('#dialog-flag').length > 0) {
						self._updateDialogFlagData(json);
					}
				} else {
					$(form).parent().block({message:textStatus + '.., but '
						+ json.message, timeout: 500});
				}
			});

			//fail ajax request
			ajax.fail(function (jqXHR, textStatus, errorThrown) {
				$(form).parent().unblock();
				$(form).parent().block({message:textStatus, timeout: 500});
			});
		} else if (opts.notification_block == 'growl') {
			//done ajax request
			ajax.done(function (data, textStatus, jqXHR) {
				var json = $.parseJSON(data);
				if (parseInt(json.status) == 1) {
					//added toggle flag on dialog if exists
					if ($('#dialog-flag').length > 0) {
						self._updateDialogFlagData(json);
					}
				} else {
				}
			});

			//fail ajax request
			ajax.fail(function (jqXHR, textStatus, errorThrown) {
			});
		} else {
			//done ajax request
			ajax.done(function (data, textStatus, jqXHR) {
				$(form).parent().unblock();
				var json = $.parseJSON(data);
				if (parseInt(json.status) == 1) {
					$(form).parent().block({message:json.message, timeout: 500});

					//added toggle flag on dialog if exists
					if ($('#dialog-flag').length > 0) {
						self._updateDialogFlagData(json);
					}
				} else {
					$(form).parent().block({message:textStatus + '.., but '
						+ json.message, timeout: 500});
				}
			});

			//fail ajax request
			ajax.fail(function (jqXHR, textStatus, errorThrown) {
				$(form).parent().unblock();
				$(form).parent().block({message:textStatus, timeout: 500});
			});
		}
	},

	_validation: function() {
		var self = this
				, opts = self.options
				, cached = self.cached;


		/* style */
		cached['table'].find('label.error').css('color', 'red');

		//adding asterix on required field
		self._addAsterix();

		//validation default options
		if (!opts.single_error_place) {
			$.validator.setDefaults({
				errorPlacement: function (er, el) {
					el.parent('td').append(er);
				}
			})
		} else {
			$.validator.setDefaults({
				errorContainer: '#error-placement_' + self.form_elem.attr('id')
				, errorLabelContainer: '#error-placement_' + self.form_elem.attr('id') + ' ul'
				, wrapper: 'li'
			})
		}

		//ignore hidden field for ckeditor
		if(!opts.is_ignore_hidden) {
			$.validator.setDefaults({
				ignore: ''
			})
		} else {
			$.validator.setDefaults({
				ignore: ':hidden'
			})
		}

		//validation initialization
		self.form_elem.validate({
			submitHandler: function (form) {
				if ($(form).data('submit') == 'ajax') {
					//ajax submit
					self._formSubmitHandler_Ajax(form);
				} else {
					//reqular submit
					form.submit();
				}
			}
		});

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
			var warn_ext = $(el).data('ext');
			if (warn_ext.indexOf('|') > -1) {
				warn_ext = warn_ext.replace(/\|/g, ',');
			}
			$(el).rules('add'
					, {
						extension : $(el).data('ext')
						, windows_compliance : true
						, messages : {
							extension : 'Valid file format ' + warn_ext
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
			else if ($(el).data('greater-equal-to') != '') {
				var label = $('#' + $(el).data('greater-equal-to'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();

				$(el).rules('add'
						, {
							greaterThanEqualToWithTime : ['#' + $(el).data('greater-equal-to'), label]
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
			else if ($(el).data('less-equal-to') != '') {
				var label = $('#' + $(el).data('less-equal-to'))
										.parent('td')
										.prev('td')
										.children('label')
										.html();

				$(el).rules('add'
						, {
							lesserThanEqualToWithTime : ['#' + $(el).data('less-equal-to'), label]
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

		/* email text area no remote */
		cached['.textarea_email_textarea_no_remote'].each(function(index, el) {
			$(el).rules('add'
								, {
									email_textarea : true
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

		/* hex value */
		cached['.input_validate_hex_value'].each(function(index, el) {
			console.log(el);
			$(el).rules('add'
								, {
									hex_value : true
								}
			);
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

	_radioParentOfGroupVisibility_Set: function () {
		var cached = this.cached,
				opts = this.options;
		cached['.radio-parent-of-group'].each(function(index, el) {
			var value = $(el).val();
			var id = $(el).attr('id').replace('hd_rad', '');
			var group = $('.child-of-' + $(el).attr('id').replace('hd_rad', ''));
			group.hide();
			var group_a = $(el).data('group-a');
			var group_b = $(el).data('group-b');
			var group_c = $(el).data('group-c');
			var arr_div = [];
			switch(parseInt(value)) {
				case 1:
					if (group_a.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_a.split('|'));
					} else {
						arr_div.push(group_a);
					}
					break;
				case 2:
					if (group_a.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_a.split('|'));
					} else {
						arr_div.push(group_a);
					}
					if (group_b.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_b.split('|'));
					} else {
						arr_div.push(group_b);
					}
					break;
				case 3:
					if (group_a.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_a.split('|'));
					} else {
						arr_div.push(group_a);
					}
					if (group_b.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_b.split('|'));
					} else {
						arr_div.push(group_b);
					}
					if (group_c.indexOf('|') > -1) {
						arr_div.push.apply(arr_div, group_c.split('|'));
					} else {
						arr_div.push(group_c);
					}
					break;
				default:
					break;
			}
			$.each(arr_div, function(ix, id) {
				var tbody = $('.wrap-' + id);
				tbody.show();
			});
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
			//radio group
			if ($('#' + id).hasClass('radio-parent-of-group')) {
				var el = '#' + id;
				var value = $(el).val();
				var id = $(el).attr('id').replace('hd_rad', '');
				var group = $('.child-of-' + $(el).attr('id').replace('hd_rad', ''));
				group.hide();
				var group_a = $(el).data('group-a');
				var group_b = $(el).data('group-b');
				var group_c = $(el).data('group-c');
				var arr_div = [];
				switch(parseInt(value)) {
					case 1:
						if (group_a.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_a.split('|'));
						} else {
							arr_div.push(group_a);
						}
						break;
					case 2:
						if (group_a.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_a.split('|'));
						} else {
							arr_div.push(group_a);
						}
						if (group_b.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_b.split('|'));
						} else {
							arr_div.push(group_b);
						}
						break;
					case 3:
						if (group_a.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_a.split('|'));
						} else {
							arr_div.push(group_a);
						}
						if (group_b.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_b.split('|'));
						} else {
							arr_div.push(group_b);
						}
						if (group_c.indexOf('|') > -1) {
							arr_div.push.apply(arr_div, group_c.split('|'));
						} else {
							arr_div.push(group_c);
						}
						break;
					default:
						break;
				}
				$.each(arr_div, function(ix, id) {
					var tbody = $('.wrap-' + id);
					tbody.show();
				});
			}
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

		//multiple-checkbox
		cached['.fotf_multiple_checkbox'].change(function(event) {
			var value = '';
			var array = [];
			$('#hd_chk' + $(this).attr('name')).val(value);
			var elem = $(this).parent('td')
										.children('input.fotf_multiple_checkbox');
			elem.each(function(index, el) {
				if ($(el).prop('checked')) {
					array.push(parseInt($(el).val()))
				}
			});
			value = array.join(',');
			$('#hd_chk' + $(this).attr('name')).val(value).trigger('change');
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

		//radio
		cached['.input_radio_addition'].each(function(index, el) {
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
			cached['.group_dropdown_multiple_alternate'].adv_query_questions();
		}

		//multiple select
		//adv_query.js required
		if(cached['.group_multiple_select'].length > 0) {
			cached['.group_multiple_select'].multiple_select();
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
		var $table = this.form_elem
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
				, $textarea_email_textarea_no_remote = $table.find('textarea.validate-email-textarea-no-remote')
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
				, $input_validate_hex_value = $table.find('input.validate-hex-value')
				, $fotf_radio = $table.find('.fotf_radio')
				, $fotf_checkbox = $table.find('.fotf_checkbox')
				, $fotf_multiple_checkbox = $table.find('.fotf_multiple_checkbox')
				, $fotf_dropdown = $table.find('select.fotf_dropdown')
				, $input_dropdown_addition = $table.find('.input_dropdown_addition')
				, $input_radio_addition = $table.find('.input_radio_addition')
				, $input_mask_fulldate = $table.find('input.mask-fulldate')
				, $input_mask_year = $table.find('input.mask-year')
				, $input_mask_zip = $table.find('input.mask-zip')
				, $input_mask_gpa = $table.find('input.mask-gpa')
				, $input_mask_numeric = $table.find('input.mask-numeric')
				, $input_mask_long_numeric = $table.find('input.mask-long_numeric')
				, $input_mask_absolute_phone_us = $table.find('input.mask-absolute_phone_us')
				, $input_mask_color = $table.find('input.mask-color')
				, $input_checkbox_phone_international = $table.find('input.checkbox-phone_international')
				, $group_dropdown_multiple_alternate = $table.find('tbody.dropdown-multiple-alternate')
				, $multiple_filter_select = $table.find('.multiple_filter_select')
				, $group_multiple_select = $table.find('tbody.group-multiple-select')
				, $radio_parent_of_group = $table.find('.radio-parent-of-group');

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
			, '.input_validate_hex_value' : $input_validate_hex_value
			, '.fotf_radio' : $fotf_radio
			, '.fotf_checkbox' : $fotf_checkbox
			, '.fotf_multiple_checkbox' : $fotf_multiple_checkbox
			, '.fotf_dropdown' : $fotf_dropdown
			, '.input_dropdown_addition' : $input_dropdown_addition
			, '.input_radio_addition' : $input_radio_addition
			, '.input_mask_fulldate' : $input_mask_fulldate
			, '.input_mask_year' : $input_mask_year
			, '.input_mask_zip' : $input_mask_zip
			, '.input_mask_gpa' : $input_mask_gpa
			, '.input_mask_numeric' : $input_mask_numeric
			, '.input_mask_long_numeric' : $input_mask_long_numeric
			, '.input_mask_absolute_phone_us' : $input_mask_absolute_phone_us
			, '.input_mask_color' : $input_mask_color
			, '.input_checkbox_phone_international' : $input_checkbox_phone_international
			, '.group_dropdown_multiple_alternate' : $group_dropdown_multiple_alternate
			, '.multiple_filter_select' : $multiple_filter_select
			, '.group_multiple_select' : $group_multiple_select
			, '.radio-parent-of-group' : $radio_parent_of_group
			, '.textarea_email_textarea_no_remote' : $textarea_email_textarea_no_remote
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