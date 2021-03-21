const app = require('./app');
const PORT = 3000;

try {
	app.listen(PORT);
	console.log('Api-Banking está online na porta: ' + PORT);
} catch (err) {
	console.log('Houve um erro na Api-Banking , segue o erro: ' + err);
}