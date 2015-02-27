Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

// the widget definition, where "orchestrate" is the namespace,
// "adv_query" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.adv_query", {
	//TODO :
	//hide content based on input hidden
	//filter hide all, if multiplefilter <> "" show multiple
	//advanced & simple toggle
	//clear options on toggle
	//button remove
	//on change session, reset application & program
	//
	
	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;
		
		// cache commonly used elements
		this.elem = $(this.element);

		// cache commonly used elements
		this._cacheElements();
		
		// sets up popup object
		this.popup = {} || this.popup;
		// sets up ajax callback for popup filter
		this._windowPopupFilterCallback();

		// bind UI actions
		this._bindUIActions();
		
		// refresh
		this._refresh();
	},
	
	/**
	 * _filterHideAll : filter hide all
	 */
	_filterHideAll: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		$.each(cached['.multiple_filter'], function(index, val) {
			var values = $(this).children('.hd_multiple_filter').val();
			if (values) {
				$(this).show();
				$(this).prev('tr').hide();
			} else {
				$(this).hide();
				$(this).prev('tr').show();
			}
		});
	},
	
	/**
	 * _multipleOptionsToggle : toggle visibility on multiple options
	 */
	_multipleOptionsToggle: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
		
		$.each(cached['.multiple_filter'], function(index, val) {
			/* iterate through multiple_filter */
			var options = $(this).find('option');
			var values = $(this).children('.hd_multiple_filter').val();
			if (values) {
				var array = values.split(',');
				/* iterate through multiple_filter */
				var options = $(this).find('option');
				$.each(options, function(index, val) {
					/* iterate through options, then hide */
					if ($.inArray(val.value, array) != -1) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			} else {
				//do nothing
			}
		});
	},
	
	/**
	 * _removeMultipleOptions : toggle filter
	 */
	_removeMultipleOptions: function(obj) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		var select = obj.find('select');
		var multiple = obj.find('.hd_multiple_filter');
		
		select.children('option').each(function(index, el) {
			$(el).hide();
		});
		
		if (multiple) {
			multiple.val('');
		} else {
			//do nothing;
		}
	},
	
	/**
	 * _removeSingleOptions : toggle filter
	 */
	_removeSingleOptions: function(obj) {
		var self = this,
				cached = self.cached,
				opts = self.options;
		var select = obj.find('select');
		var single = obj.find('.hd_single_filter');
		single.val(0);
	},

	/**
	 * _buttonAdvancedSimpleToggle : toggle filter
	 */
	_buttonAdvancedSimpleToggle: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;

		$.each(cached['.btn_toggle-advanced'], function(index, val) {
			$(this).click(function(event) {
				/* Act on the event */
				var filter = $(this).closest('.filter');
				filter.hide();
				filter.next('.filter').show();
				var lyr = filter.next('.filter');
				self._removeMultipleOptions(lyr);
			});
		});	
		
		$.each(cached['.btn_toggle-simple'], function(index, val) {
			$(this).click(function(event) {
				var filter = $(this).closest('.filter');
				filter.hide();
				filter.prev('.filter').show();
				var lyr = filter.prev('.filter');
				self._removeSingleOptions(lyr);
			});
		});	
	},

	/**
	 * _popupAdvancedFilter : popup advanced filter
	 */
	_popupAdvancedFilter: function() {
		var self = this,
				cached = self.cached,
				opts = self.options;
				win_filter = self.options;
		
		$.each(cached['.btn_popup-filter'], function(index, val) {
			$(val).click(function(event) {
				var popup = $(this).data('popup');
				var data = {} || data;
				
				if ($(this).data('session')) {
					data.session = $(this).data('session');
				} else {
					data.session = '';
				}
				
				if ($(this).data('program')) {
					data.program = $(this).data('program');
				} else {
					data.program = '';
				}
				//call popup filter
				self.popup.filter[popup](data);
			});
		});
	},
	
	/**
	 * _buttonMultipleOptionsRemove : button multiple options
	 */
	_buttonMultipleOptionsRemove: function() {
		var cached = this.cached,
				opts = this.options;

		$.each(cached['.btn-remove'], function(index, val) {
			$(val).click(function(event) {
				var lyr = $(this).closest('.multiple_filter');
				var select = lyr.find('.multiple_filter_select');
				
				//gets hidden value
				var hd_value = lyr.find('.hd_multiple_filter').val();
				if (hd_value) {
					if (hd_value.indexOf(',') > -1) {
						hd_value = hd_value.split(',');
					} else {
						hd_value = [hd_value];
					}
				} else {
					hd_value = [0];
				}

				//alter value
				var value = select.val();
				var diff_hd_value = [];
				$.each(value, function(index, val) {
					select.find('option[value=' + val + ']').hide();
					if ($.inArray(val, hd_value) > -1 ) {
						diff_hd_value.push(val);
					} else {
						//do nothing
					}
				});

				new_hd_value = hd_value.diff(diff_hd_value);
				//setting new hidden value
				lyr.find('.hd_multiple_filter').val(new_hd_value.join(','))
																			 .trigger('change');
			});
		});
	},

	/**
	 * _bindUIActions : bind UI Event on record_list
	 */
	_bindUIActions: function() {
		var cached = this.cached,
				opts = this.options;
		// initial filter hide all
		this._filterHideAll();
		// initial options toggle
		this._multipleOptionsToggle();
		//button toggle
		this._buttonAdvancedSimpleToggle();
		//button popup
		this._popupAdvancedFilter();
		//button remove
		this._buttonMultipleOptionsRemove();
	},

	// called when created, and later when changing options
	_refresh: function() {
	},
	
	/**
	 * _windowPopupFilterCallback : cached popup filter using state design
	 */
	_windowPopupFilterCallback: function() {
		var win = {} || win;

		//session filter popup
		win.session = function (data) {
			var iHandle = window.open('popup_session_add.asp','_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//program filter popup
		win.program = function (data) {
			var iHandle = window.open('popup_program_add.asp?session=' + data.session 
																,'_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//app_profile filter popup
		win.app_profile = function (data) {
			var iHandle = window.open('popup_application_add.asp?session=' 
																+ data.session + '&program=' 
																+ data.program,'_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}
		
		//status filter popup
		win.status = function (data) {
			var iHandle = window.open('popup_status_add.asp','_blank'
																,'width=650,height=350,toolbar=no,top=100' +
																',left=100,location=no,directories=no' +
																',status=yes,menubar=no,scrollbars=yes' +
																',copyhistory=no,resizable=yes');
			popupHandle[ iTotalPopup++ ] = iHandle;
			return true;
		}

		this.popup.filter = win;
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $div = this.elem
				, $filter = $div.find('.filter')
				, $single_filter = $div.find('.single_filter')
				, $multiple_filter = $div.find('.multiple_filter')
				, $btn_toggle_advanced = $div.find('.btn_toggle-advanced')
				, $btn_toggle_simple = $div.find('.btn_toggle-simple')
				, $btn_popup_filter = $div.find('.btn_popup-filter')
				, $btn_remove = $div.find('.btn-remove');
		
		this.cached = {
			'div' : $div
			, '.filter' : $filter
			, '.single_filter' : $single_filter
			, '.multiple_filter' : $multiple_filter
			, '.btn_toggle-advanced' : $btn_toggle_advanced
			, '.btn_toggle-simple' : $btn_toggle_simple
			, '.btn_popup-filter' : $btn_popup_filter
			, '.btn-remove' : $btn_remove
		};
	}
});