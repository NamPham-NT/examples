exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/', view_homepage, ['xhr', 'post']);
};

function view_homepage() {
	var self = this;

	if (!self.xhr) {
		self.meta('Validation example');
		self.view('index', { LoginName: '@' });
		return;
	}

	// Look here: https://github.com/totaljs/examples/tree/master/framework-schema-validation
	var result = self.validate(self.post, ['FirstName', 'LastName', 'Age', 'Email', 'Terms'], 'Form');

	// Documentation: ErrorBuilder
	if (result.hasError()) {
		result.replace('@Email', self.post.Email);
		self.json(result);
		return;
	}

	self.json({ r: true });
}