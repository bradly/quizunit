var I18n = {
  'locales' : { 'en' : {} },
  'default_locale' : 'en',
  'locale' : 'en',
  
  't' : function (key, args) {
    var arg;
    var translation;
    var arg_regex;
    
    if (this.locales[this.locale] === undefined) {
      this.locales[this.locale] = {};
    }
    
    translation = this.locales[this.locale][key];
    
    if (args !== undefined) {
      for (arg in args) {
        if (args.hasOwnProperty(arg)) {
          arg_regex = new RegExp('{{' + arg + '}}', 'g');
          translation = translation.replace(arg_regex, args[arg]);
        }
      }
    }
    
    return translation || 'missing_translation: ' + key;
  },
  
  'set_locale' : function (new_locale) {
    if (new_locale === undefined) {
      var html_node = document.getElementsByTagName('html')[0];
      this.locale = html_node.lang || this.default_locale;
    } else {
      this.locale = new_locale;
    }
  }
};

I18n.set_locale();