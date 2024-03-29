// QuizUnit.js
// Copyright 2011 Bradly Feeley

var QuizUnit = {
  'number_of_tests_passed' : 0,
  'number_of_tests_failed' : 0,
  'start_time' : null,
  'end_time'   : null,
  'run_time'   : null,
  'targets'    : null,
  
  'ensure_test_target_has_tests' : function (test_target) {
    if (!test_target.hasOwnProperty('test_suite')) {
      throw('TestSuiteNotFoundException');
    }
  },
  
  'logger' : function (message) {
    document.write(message);
    // print(message);
    // $stdin(message);
    // console.log(message);
  },
  
  'run_test' : function (test_name, test_case) {
    var error = null;
    var result = null;
    var expected = test_case[1];

    try {
      result = test_case[0]();
    } catch (exception) {
      error = exception;
    }

    if (result === expected) {
      this.test_passed();
      this.number_of_tests_passed += 1;
    } else {
      this.number_of_tests_failed += 1;
      this.test_failed(test_name, expected, (error || result));
    }
  },
  
  'run_tests' : function (test_target) {
    this.ensure_test_target_has_tests(test_target);
    this.start_time = (new Date()).getTime();
    this.start();
    
    var test_suite = test_target.test_suite;
    var test_case = null;
    
    if (test_suite['before_all'] !== undefined) {
      test_suite['before_all']();
    }
  
    for (test_name in test_suite) {
      if (test_suite.hasOwnProperty(test_name) && test_name.match(/^should/)) {
        if (test_suite['before_each'] !== undefined) {
          test_suite['before_each']();
        }
        this.run_test( test_name, test_target.test_suite[test_name] );
        if (test_suite['after_each'] !== undefined) {
          test_suite['after_each']();
        }
      }
    }
    
    if (test_suite['after_all'] !== undefined) {
      test_suite['after_all']();
    }
    
    this.end_time = (new Date()).getTime();
    this.run_time = (this.end_time - this.start_time) / 1000.0;
    this.number_of_tests = this.number_of_tests_passed + this.number_of_tests_failed;
    
    if ( this.number_of_failed == 0 ) {
      this.all_passed();
    } else if ( this.number_of_tests_passed == 0 ) {
      this.all_failed();
    }
    
    this.complete();
  },
  
  'start' : function () {
    this.logger('<h2>Running tests...</h2>');
  },
  
  'test_passed' : function (test_name) {
    this.logger('.<br/>');
  },
  
  'all_passed' : function () {
    this.logger('Good to go!');
  },
  
  'all_failed' : function () {
    // this.logger('Oh noes!');
  },
  
  'test_failed' : function (test_name, expected, result) {
    this.logger('<h2 style="color:#c00;">`' + test_name + '` failed: expected `' + expected + '`, but got `' + result + '`</h2>');
  },
  
  'complete' : function () {
    message  = '<h2>' + this.number_of_tests + ' tests run in ' + this.run_time + ' seconds.</h2>'
    message += '<h2><span style="color:#080;">' + this.number_of_tests_passed + ' passed</span>'
    message += ', <span style="color:' + (this.number_of_tests_failed > 0 ? '#c00' : '#000') + ';">' + this.number_of_tests_failed + ' failed.</span></h2>'; 
    this.logger(message);
  },
};