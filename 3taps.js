if (typeof jQuery == 'undefined') alert('jQuery required');

var threeTapsClient = function(authToken) {
    this.authToken = authToken || '';

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
    authToken: null,
    response: null,

    request: function(path, method, params, callback) {
        params = params || {};
        $.each(params, function(k, v) {
            if (v != null && typeof v === "object")
                params[k] = JSON.stringify(v);
        });

        var url = 'http://3taps.net' + path + method + (method.indexOf('?') == -1 ? '?' : '') + 'authToken=' + this.authToken;

        $.getJSON(url, params, callback);

        return true;
    }
};

var threeTapsReferenceClient = function(authToken) {
    if (authToken instanceof threeTapsClient) {
        this.client = authToken;
    } else {
        this.client = new threeTapsClient(authToken);
    }
};

threeTapsReferenceClient.prototype = {
    client: null,

    path: '/reference',

    categories: function(callback) {
        return this.client.request(this.path, '/categories', null, callback);
    }
};

threeTapsClient.register('reference', threeTapsReferenceClient);

var threeTapsSearchClient = function(authToken) {
    if (authToken instanceof threeTapsClient) {
        this.client = authToken;
    } else {
        this.client = new threeTapsClient(authToken);
    }
};

threeTapsSearchClient.prototype = {
    client: null,

    path: '/search',

    search: function(params, callback) {
        return this.client.request(this.path, '', params, callback);
    },

    summary: function(params, callback) {
        return this.client.request(this.path, '/summary', params, callback);
    },

    count: function(params, callback) {
        return this.client.request(this.path, '/count', params, callback);
    }
};

threeTapsClient.register('search', threeTapsSearchClient);

// Override date to have threetaps format
Date.formatThreeTaps = function (date) {

    var zeroFill = function(number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number;
    }

    var formatted = date.getFullYear() + '/'
        + zeroFill((date.getMonth() + 1), 2) + '/'
        + zeroFill(date.getDate(), 2) + ' '
        + zeroFill(date.getHours(), 2) + ':'
        + zeroFill(date.getMinutes(), 2) + ':'
        + zeroFill(date.getSeconds(), 2);

    return formatted;
};

