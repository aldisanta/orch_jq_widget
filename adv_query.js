// the widget definition, where "orchestrate" is the namespace,
// "adv_query" the widget name
// bind on form containing the record list table
$.widget( "orchestrate.adv_query", {
	//TODO :
	//hide content based on input hidden
	//filter hide all, if multiplefilter <> "" show multiple
	//advanced & simple toggle
	//
	//
	
	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var opts = this.options;
		
		// cache commonly used elements
		this.form_elem = $(this.element);

		// cache commonly used elements
		this._cacheElements();

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
			});
		});	
		
		$.each(cached['.btn_toggle-simple'], function(index, val) {
			$(this).click(function(event) {
				var filter = $(this).closest('.filter');
				filter.hide();
				filter.prev('.filter').show();
			});
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
	},

	// called when created, and later when changing options
	_refresh: function() {
	},

	/**
	 * _cacheElements : cached DOM Elements
	 */
	_cacheElements: function() {
		var $form = this.form_elem
				, $filter = $form.find('.filter')
				, $single_filter = $form.find('.single_filter')
				, $multiple_filter = $form.find('.multiple_filter')
				, $btn_toggle_advanced = $form.find('.btn_toggle-advanced')
				, $btn_toggle_simple = $form.find('.btn_toggle-simple');
		
		this.cached = {
			'form' : $form
			, '.filter' : $filter
			, '.single_filter' : $single_filter
			, '.multiple_filter' : $multiple_filter
			, '.btn_toggle-advanced' : $btn_toggle_advanced
			, '.btn_toggle-simple' : $btn_toggle_simple
		};
	}
});