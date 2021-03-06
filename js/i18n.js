(function(window, undefined) {
	var i18n = {
		/* The loaded JSON message store will be set on this object */
		msgStore: {},
		persistMsgStore: function(data) {
			if(window.localStorage) {
				localStorage.setItem("msgStore", JSON.stringify(data));
				this.msgStore = data;
			} else {
				this.msgStore = data;
			}
		},
		setLanguage: function(lang) {
			$.ajax({
				url: "/locale/" + lang + ".json",
				dataType: "json",
				success: function(data) {
					i18n.persistMsgStore(data);
				},
				error: function(error) {
					$.getJSON("/locale/en-US.json", function(data) {
						i18n.persistMsgStore(data);
					});
				}
			});
		},
		initMsgStore: function(options) {
			var lang = "en-US";
			$.ajax({
				url: options.dataUrl,
				success: function(data) {
					lang = options.supportLocale ? data : data.substring(0, 2);
					i18n.setLanguage(lang);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					lang = options.supportLocale ? lang : lang.substring(0, 2);
					i18n.setLanguage(lang);
				}
			});
		},
		userSelected: function(lang) {
			this.setLanguage(lang);
		},
		init: function(options) {
			var localMsgStore = "";
			if(!!window.localStorage) {
				localMsgStore = localStorage.getItem("msgStore");
				if(localMsgStore !== null) {
					this.msgStore = JSON.parse(localMsgStore);
				} else {
					this.initMsgStore(options);
				}
			} else {
				this.initMsgStore(options);
			}
		}
	};
	/* Expose i18n to the global object */
	window.i18n = i18n;
})(window);