# DeepL.js

This is a very small, quickly written NodeJS promise-based module for quick DeepL integration. It's not much, but it takes care of the entire communication process and lets you work faster.

#### Warning
* This is not a complete API adapter, rather it's just, as already mentioned a quickly written module, so it's not perfect.
* Multiple texts are not supported at the moment

## Usage

### Setup

Of course, you will always need to import the module first

`const DeepL = require('./DeepL.js')...`

However, in order to properly configure your DeepL instance, you will also need to provide your own API key and specify whether it's a premium or a free one too, which makes our setup code as follows:

`const DeepL = require('YOUR-CODE-HERE', true/false)`

### Translation (`.translate`)

#### Request

Once you have your DeepL instance set up, it's time to perform some translations, which can be achieved using the async `.translate` method.

```
await DeepL.translate({
  text: 'This is my first translation!',
  to: 'German'
})
```

This can be done just as easily. The `.translate` method expects an object as an argument and looks for the following keys:

#### Response

```
{
  detected_source_language: 'EN',
  text: 'Dies ist meine erste Übersetzung!'
}
```

Unless an error such as a wrong language identifier or request failed occurs, you should be primarily directly facing DeepL API responses, which are well documented on their own website @ https://www.deepl.com/docs-api/translate-text/translate-text

The one major difference is that due to the lack of multiple texts support, the module will automatically provide the first object in the `translations` array, which makes it quicker to work with.

#### Special

`text` - String, required - Text to be translated
`to` - String, required - Language to translate the text into. This can be either the language's name in English (case-insensitive) or it's shorthand.
`from` - String, optional - Language from which to translate. Same terms apply as for `to`

#### Other

The following keys are not necessary, and are only a bit differently written than their matching counterparts expected by DeepL API. For further documentation regarding all the keys, please check out https://www.deepl.com/docs-api/translate-text/translate-text

`preserveFormatting`, `formality`, `tagHandling`, `splitSentences`, `glossaryId`, `outlineDetection`, `nonSplittingTags`, `splittingTags`, `ignoreTags`
