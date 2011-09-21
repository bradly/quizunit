I18n.test_suite = {
  'before_all'  : function() { },
  'before_each' : function() { I18n.set_locale('en'); },
  'after_all'   : function() { },
  'after_each'  : function() { },
  
  'should set default locale' : [
    function () {
      return I18n.locale;
    },
    I18n.default_locale
  ],
  
  'should set locale when passed in' : [
    function () {
      I18n.set_locale('it');
      return I18n.locale;
    },
    'it'
  ],
  
  'should return missing translation when locale does not exist' : [
    function () {
      I18n.set_locale('it');
      return I18n.t('some_missing_translation');
    }, 
    'missing_translation: some_missing_translation'
  ],
  
  'should return translation when found' : [
    function () {
      I18n.locales.en.test_tranlation = 'Translation in English!';
      return I18n.t('test_tranlation');
    }, 
    'Translation in English!'
  ],
  
  'should return missing translation when a translation is not found' : [
    function () {
      return I18n.t('some_missing_translation');
    },
    'missing_translation: some_missing_translation'
  ],
  
  'should allow variables to be passed in' : [
    function () {
      I18n.locales.en.hello_name = 'Hello, {{name}}!';
      return I18n.t('hello_name', {'name' : 'Bradly'});
    },
    'Hello, Bradly!'
  ],
  
  'should allow variables to be used more than once' : [
    function () {
      I18n.locales.en.hello_name = 'Hello, {{name}}! Your name is {{name}}.';
      return I18n.t('hello_name', {'name' : 'Bradly'});
    },
    'Hello, Bradly! Your name is Bradly.'
  ],
  
  'should allow multiple variables to be used' : [
    function () {
      I18n.locales.en.greeting = '{{greeting}}, {{name}}!';
      return I18n.t('greeting', {'greeting' : 'Hi', 'name' : 'Bradly'});
    },
    'Hi, Bradly!'
  ]
};