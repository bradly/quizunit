// QuizUnit.js
// Copyright 2011 Bradly Feeley

var TestRuner = {
  'number_of_tests' : 0,
  'number_of_tests_passed' : 0,
  'number_of_tests_failed' : 0,
  'start_time' : null,
  'end_time' : null,
  'run_time' : null,
  
  'ensure_test_target_has_tests' : function (test_target) {
    if (!test_target.hasOwnProperty('test_suite')) {
      throw('TestSuiteNotFoundException');
    }
  },
  
  'logger' : function (message) {
    // document.write(message + '<br />');
    // print(message);
    // $stdin(message);
    console.log(message);
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
      this.logger('.');
    } else {
      this.number_of_tests_failed += 1;
      this.logger('`' + test_name + '` failed: expected `' + expected + '`, but got `' + (error || result) + '`');
    }
  },
  
  'run_tests' : function (test_target) {
    this.ensure_test_target_has_tests(test_target);
    
    this.number_of_tests_failed = 0;
    this.start_time = (new Date()).getTime();
    this.number_of_tests = Object.keys(test_target.test_suite).length;
    var test_suite = test_target.test_suite;
    var test_case = null;
    
    this.logger('Running ' + this.number_of_tests + ' tests...');
  
    for (test_name in test_suite) {
      if (test_suite.hasOwnProperty(test_name)) {
        this.run_test( test_name, test_target.test_suite[test_name] );
      }
    }
        
    this.end_time = (new Date()).getTime();
    this.run_time = (this.end_time - this.start_time) / 1000.0;
    this.number_of_tests_passed = this.number_of_tests - this.number_of_tests_failed;

    this.logger(this.number_of_tests + ' tests run in ' + this.run_time + ' seconds.');
    this.logger(this.number_of_tests_passed + ' passed, ' + this.number_of_tests_failed + ' failed.');
  }
};