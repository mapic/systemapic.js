M.Socket = M.Class.extend({

	initialize : function () {

		if(window.testMode){
			console.log(window);
		}

		// create socket
		// this._socket = window.io.connect(window.location.origin, { forceNew: false });
		this._socket = window.io.connect('/', {
			rememberUpgrade : true,
			timeout : 60000,
			reconnection : true,

		});

		// add listeners
		this._listen();

		// add loops
		this._addLoops();
	},

	_addLoops : function () {
		setInterval(function () {
			this._getServerStats();
		}.bind(this), 10000);
	},

	_getServerStats : function () {
		app.Socket.send('get_server_stats');
	},

	sendUserEvent : function (options) {
		// defaults
		options.user = options.user || app.Account.getFullName();
		options.timestamp = options.timestamp || Date.now();

		// send event
		var socket = this._socket;
		app.Socket.send('analytics', options);
	},

	analytics : function (options) {
		// send event
		var socket = this._socket;
		app.Socket.send('analytics', options);
	},


	send : function (channel, options, callback) {

		// add access_token
		var options = options || {};
		options.access_token = app.tokens.access_token;

		// send event
		var socket = this._socket;
		socket.emit(channel, options);
	},

	_listen : function () {
		var socket = this._socket;

		socket.on('server_stats', function (data) {
			var stats = data.server_stats;
			if (app.Chrome) app.Chrome.Top.updateCPUclock(stats.cpu_usage);
		});

		socket.on('connect', function(){
			console.log('Securely connected to socket.');
			app.Socket.send('ready');
			app.log('socket:ready', { info : {
				socket_id : app.Socket._socket.socket.sessionid
			}});
		});
		
		socket.on('event', function(data){
			console.log('socket event data: ', data);
			app.log('socket:event', {
				info : data
			});

		});

		socket.on('tile_count', function(data){
			M.Mixin.Events.fire('tileCount', {
				detail : data
			});
		});
		
		socket.on('tileset_meta', function(data){
			M.Mixin.Events.fire('tileset_meta', {
				detail : data
			});
		});
		
		socket.on('disconnect', function(){
			console.log('socket disconnect!');
			app.log('socket:disconnect');

			// app._login('You have been logged out. Please log back in.')
		});
		
		socket.on('reconnect', function(){
			console.log('socket reconnecting!');
			
			app.log('socket:reconnecting');
		});
		
		socket.on('reconnect_error', function(){
			console.log('socket reconnect_error!');

			app.log('socket:reconnect:error');
		});
		
		socket.on('reconnect_failed', function(){
			console.log('socket reconnect_failed!');

			app.log('socket:reconnect:failed');
		});
		
		socket.on('processingProgress', function(data) {
			console.log('socket processingProgress', data)
			M.Mixin.Events.fire('processingProgress', {
				detail : data
			});

			app.log('processing:progress', { info : data });
		});
		
		socket.on('stats', function(data) {
		});
		
		socket.on('uploadDone', function (data) {
			console.log('socket uploadDone', data);
			app.log('upload:done', { info : data });

		});
		
		socket.on('generate_tiles', function (data) {
			if (!data || data.err) return;

			// fire
			M.Mixin.Events.fire('generatedTiles', {
				detail : data
			});

		});
		
		socket.on('downloadReady', function (data) {
			console.log('socket downloadReady', data);

			app.log('download:ready', { info : data });
			
			var event_id = 'downloadReady-' + data.file_id;
			M.Mixin.Events.fire(event_id, {detail : data});
		});
		
		socket.on('processingDone', function (data) {
			console.log('socket processingDone', data);

			app.log('processing:done', { info : data });

			// notify data lib
			var file_id = data.file_id;
			var import_took_ms = data.import_took_ms;

			app.Data._onImportedFile(file_id, import_took_ms);
		});
		
		socket.on('errorMessage', function (data) {
			console.log('socket errorMessage', data);
			
			app.log('socket:error', { info : data });

			var content = data.error;
			var uniqueIdentifier = content.uniqueIdentifier;

			if (uniqueIdentifier) {
				
				// file error
				M.Mixin.Events.fire('processingError', {
					detail : content
				});

			} else {

				app.FeedbackPane.setError({
					title : content.title,
					description : content.description
				});
			}

		});

	},

	getSocket : function () {
		return this._socket;
	},	

	
});