app.views.menu = Backbone.View.extend({
	initialize:function() {},
	render:function() {
		var _this = this;
		$.get('/app/templates/menu.html',function(data) {
			template = _.template(data);
			_this.$el.html(template({}));
			return _this;
		},'html');		
	},
	events:{
		"click a#menu-close":"toggleClose",
		"click a#menu-toggle":"toggleOpen"
	},
	toggleClose:function() {
		$("#sidebar-wrapper").toggleClass("active");
	},
	toggleOpen:function() {
		$("#sidebar-wrapper").toggleClass("active");
	},
	process:function() {
		//hide the menu
		$("#sidebar-wrapper").toggleClass("active");
		//continue
		return true;
	}
});