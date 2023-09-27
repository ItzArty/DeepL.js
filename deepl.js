module.exports = ( key, premium ) => {

	const translate = ( { text, from, to, preserveFormatting, formality, tagHandling, splitSentences, glossaryId, outlineDetection, nonSplittingTags, splittingTags, ignoreTags } ) => new Promise( async ( resolve, reject ) => {

		to = to.toLowerCase( );
		if( from ) from = from.toLowerCase( );

		const validLanguages = {

			bulgarian: 'bg',
			czech: 'cs',
			danish: 'da',
			german: 'de',
			greek: 'el',
			english: 'en',
			spanish: 'es',
			estonian: 'et',
			finnish: 'fi',
			french: 'fr',
			hungarian: 'hu',
			italian: 'it',
			japanese: 'ja',
			korean: 'ko',
			lithuanian: 'lt',
			latvian: 'lv',
			norvegian: 'nb',
			dutch: 'nl',
			polish: 'pl',
			portugese: 'pt',
			romanian: 'ro',
			russian: 'ru',
			slovak: 'sk',
			slovenian: 'sl',
			swedish: 'sv',
			turkish: 'tr',
			ukrainian: 'uk',
			chinese: 'zh'

		}

		if( !Object.keys( validLanguages ).includes( to ) && !Object.values( validLanguages ).includes( to ) ) {

			reject( 'Invalid language' );
			return;

		}

		if( validLanguages[ to ] ) to = validLanguages[ to ];

		let bodyObject = {

			text: [ text ],
			target_lang: to

		}

		if( from ) bodyObject.source_lang = from;
		if( formality ) bodyObject.formality = formality;
		if( preserveFormatting ) bodyObject.preserve_formatting = preserveFormatting;
		if( tagHandling ) bodyObject.tag_handling = tagHandling; // XML, HTML
		if( splitSentences ) bodyObject.split_sentences = splitSentences;
		if( glossaryId ) bodyObject.glossary_id = glossaryId;
		if( outlineDetection ) bodyObject.oultine_detection = outlineDetection;
		if( nonSplittingTags ) bodyObject.non_splitting_tags = nonSplittingTags;
		if( splittingTags ) bodyObject.splitting_tags = splittingTags;
		if( ignoreTags ) bodyObject.ignore_tags = ignoreTags;

		const body = JSON.stringify( bodyObject );

		fetch( `https://${ premium ? 'api' : 'api-free' }.deepl.com/v2/translate`, {

			method: 'POST',
			headers: {
				'Authorization': 'DeepL-Auth-Key ' + key,
				'Content-Type': 'application/json',
				'Content-Length': Buffer.from( body ).length,
			},
			body

		} ).then( response => response.json( ) ).then( json => {

			if( !json.translations ) {

				reject( json.message ? json.message : 'Translation failed' );
				return;

			}

			resolve( json.translations[ 0 ] );

		} ).catch( error => reject( error ) );

	} );

	return { translate };

}