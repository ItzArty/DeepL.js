
const DeepL = require( './deepl.js' )( 'YOUR-KEY-HERE', false );

DeepL.translate( {

	text: 'Hello, my name is David',
	to: 'Slovak'

} ).then( console.log )