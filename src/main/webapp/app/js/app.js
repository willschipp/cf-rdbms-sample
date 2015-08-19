var app = (function() {
	
	var api = {
		views:{},
		models:{},
		collections:{},
		content:null,
		router:null,
		vent:{},
		init:function() {
			this.content = $('#container');
			_.extend(this.vent,Backbone.Events);
			ViewsFactory.menu().render();
			Backbone.history.start();
			return this;
		},
		changeContent:function(el) {
			this.content.empty().append(el);
			return this;
		}
	};
	
	var ViewsFactory = {
			menu:function() {
				if (!this.menuView) {
					this.menuView = new api.views.menu({
						el:$('#menu')
					});
				}//end if
				return this.menuView;
			},		
			home:function() {
				if (!this.homeView) {
					this.homeView = new api.views.home({
						el:$('#container')
					});
				}//end if
				return this.homeView;
			}
	};
	//router
	var Router = Backbone.Router.extend({
		routes: {
			"":"home",
		},
		home:function() {
			var view = ViewsFactory.home();
			view.render();
			api.changeContent(view.$el);			
		}
	});

	
	api.router = new Router();
		
	return api;
})();