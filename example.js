const DeepL = require( './DeepL.js' )( 'YOUR-KEY-HERE', false );

DeepL.translate( {

	text: 'Hello, my name is David',
	to: 'Slovak'

} ).then( console.log )
