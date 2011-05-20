if (typeof jQuery == 'undefined') alert('jQuery required');

var threeTapsClient = function(authId) {
	this.authId = authId || '';
	
	for (var type in threeTapsClient.clients) {
		var client = threeTapsClient.clients[type];
		this[type] = new client(this);
	}
};

threeTapsClient.clients = {};

threeTapsClient.register = function(type, client) {
	threeTapsClient.clients[type] = client;
};

threeTapsClient.prototype = {
	authId: null,
	response: null,

	request: function(path, method, params, callback) {
		params = params || {};

		var url = 'http://api.3taps.com' + path + method + '?authID=' + this.authId + '&callback=?';

		$.getJSON(url, params, function(response) {
				callback(response);
		});
			
		return true;
	}
};

var threeTapsGeocoderClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsGeocoderClient.prototype = {
	client: null,

	path: '/geocoder/',
	
	geocode: function(data, callback) {
		var params = {
			authID: this.client.authId
			,data: data
		};
		return this.client.request(this.path, 'geocode', params, function(results) {
			callback(results);
		});
	}
};

threeTapsClient.register('geocoder', threeTapsGeocoderClient);

var threeTapsReferenceClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsReferenceClient.prototype = {
	client: null,

	path: '/reference/',
	
	category: function(callback) {
		return this.client.request(this.path, 'category', null, function(results) {
			callback(results);
		});
	},

	location: function(callback) {
		return this.client.request(this.path, 'location', null, function(results) {
			callback(results);
		});
	},

	source: function(callback) {
		return this.client.request(this.path, 'source/get', null, function(results) {
			callback(results);
		});
	}
};

threeTapsClient.register('reference', threeTapsReferenceClient);
	
	
var threeTapsPostingClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsPostingClient.prototype = {
	client: null,

	path: '/posting/',
	
	'delete': function(data, callback) {
		var params = {
			authID: this.client.authId
			,data: data
		};
		return this.client.request(this.path, 'delete', params, function(results) {
			callback(results);
		});
	},
	
	get: function(postID, callback) {
		return this.client.request(this.path, 'get/' + postID, null, function(results) {
			callback(results);
		});
	},
	
	create: function(data, callback) {
		var params = {
			data: data
		};
		return this.client.request(this.path, 'create', params, function(results) {
			callback(results);
		});
	},
	
	update: function(data, callback) {
		var params = {
			authID: this.client.authId
			,data: data
		};
		return this.client.request(this.path, 'update', params, function(results) {
			callback(results);
		});
	}
};

threeTapsClient.register('posting', threeTapsPostingClient);

var threeTapsNotificationsClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsNotificationsClient.prototype = {
	client: null,

	path: '/notifications/',

	firehose: function(params, callback) {
    return this.client.request(this.path, 'firehose', params, function(results) {
      callback(results);
    });
  },

	'delete': function(params, callback) {
    return this.client.request(this.path, 'delete', params, function(results) {
      callback(results);
    });
  },


	'get': function(params, callback) {
    return this.client.request(this.path, 'get', params, function(results) {
      callback(results);
    });
  },

	create: function(params, callback) {
		return this.client.request(this.path, 'create', params, function(results) {
			callback(results);
		});
	}
};

threeTapsClient.register('notifications', threeTapsNotificationsClient);

var threeTapsSearchClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsSearchClient.prototype = {
	client: null,

	path: '/search/',
	
	'search': function(params, callback) {
		return this.client.request(this.path, '', params, function(results) {
			callback(results);
		});
	},
	
	range: function(params, callback) {
		return this.client.request(this.path, 'range', params, function(results) {
			callback(results);
		});
	},

	summary: function(params, callback) {
		return this.client.request(this.path, 'summary', params, function(results) {
			callback(results);
		});
	},

	count: function(params, callback) {
		return this.client.request(this.path, 'count', params, function(results) {
			callback(results);
		});
	},
};

threeTapsClient.register('search', threeTapsSearchClient);

var threeTapsStatusClient = function(authId) {
	if (authId instanceof threeTapsClient) {
		this.client = authId;
	} else {
		this.client = new threeTapsClient(authId);
	}
};

threeTapsStatusClient.prototype = {
	client: null,

	path: '/status/',
	
	update: function(data, callback) {
		var params = {
			authID: this.client.authId
			,data: data
		};
		return this.client.request(this.path, 'update', params, function(results) {
			callback(results);
		});
	},
	
	get: function(data, callback) {
		var params = {
			authID: this.client.authId
			,data: data
		};
		return this.client.request(this.path, 'get', params, function(results) {
			callback(results);
		});
	},

	system: function(callback) {
		var params = {
			authID: this.client.authId
		};
		return this.client.request(this.path, 'system', params, function(results) {
			callback(results);
		});
	}
};

threeTapsClient.register('status', threeTapsStatusClient);
