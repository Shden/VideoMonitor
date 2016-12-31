module.exports = {
  "env": {
    "node": true
  },
  "rules": {
    "no-cond-assign": 1,                  // disallow assignment in conditional expressions
    "no-console": 0,                      // disallow use of console: should use nuclide-logging instead
    "no-constant-condition": 1,           // disallow use of constant expressions in conditions
    "comma-dangle": [                     // disallow trailing commas in object and array literals
      1, "always-multiline"
    ],
    "no-control-regex": 1,                // disallow control characters in regular expressions
    "no-debugger": 1,                     // disallow use of debugger
    "no-dupe-keys": 1,                    // disallow duplicate keys when creating object literals
    "no-dupe-args": 1,                    // disallow duplicate arguments in functions
    "no-duplicate-case": 1,               // disallow a duplicate case label
    "no-empty": 0,                        // disallow empty statements
    "no-empty-character-class": 1,        // disallow the use of empty character classes in regular expressions
    "no-ex-assign": 1,                    // disallow assigning to the exception in a catch block
    "no-extra-boolean-cast": 1,           // disallow double-negation boolean casts in a boolean context
    "no-extra-semi": 1,                   // disallow unnecessary semicolons
    "no-func-assign": 1,                  // disallow overwriting functions written as function declarations
    "no-inner-declarations": 0,           // disallow function or variable declarations in nested blocks
    "no-invalid-regexp": 1,               // disallow invalid regular expression strings in the RegExp constructor
    "no-negated-in-lhs": 1,               // disallow negation of the left operand of an in expression
    "no-obj-calls": 1,                    // disallow the use of object properties of the global object (Math and JSON) as functions
    "no-regex-spaces": 1,                 // disallow multiple spaces in a regular expression literal
    "no-reserved-keys": 0,                // disallow reserved words being used as object literal keys
    "no-sparse-arrays": 1,                // disallow sparse arrays
    "no-unreachable": 1,                  // disallow unreachable statements after a return, throw, continue, or break statement
    "use-isnan": 1,                       // disallow comparisons with the value NaN
    "valid-jsdoc": 0,                     // Ensure JSDoc comments are valid
    "valid-typeof": 1,                    // Ensure that the results of typeof are compared against a valid string

    // Best Practices (designed to prevent you from making mistakes)

    "block-scoped-var": 0,                // treat var statements as if they were block scoped
    "complexity": 0,                      // specify the maximum cyclomatic complexity allowed in a program
    "consistent-return": 0,               // require return statements to either always or never specify values
    "curly": 1,                           // specify curly brace conventions for all control statements
    "default-case": 0,                    // require default case in switch statements
    "dot-notation": 0,                    // dot notation encouraged except for foreign properties that cannot be renamed (i.e., Closure Compiler rules)
    "eqeqeq": [1, "allow-null"],          // require the use of === and !==
    "guard-for-in": 1,                    // make sure for-in loops have an if statement
    "no-alert": 1,                        // disallow the use of alert, confirm, and prompt
    "no-caller": 1,                       // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 1,                    // disallow division operators explicitly at beginning of regular expression
    "no-else-return": 0,                  // disallow else after a return in an if
    "no-labels": 1,                  	  // disallow use of labels for anything other then loops and switches
    "no-eq-null": 0,                      // disallow comparisons to null without a type-checking operator
    "no-eval": 1,                         // disallow use of eval()
    "no-extend-native": 1,                // disallow adding to native types
    "no-extra-bind": 1,                   // disallow unnecessary function binding
    "no-fallthrough": 1,                  // disallow fallthrough of case statements
    "no-floating-decimal": 1,             // disallow the use of leading or trailing decimal points in numeric literals
    "no-implied-eval": 1,                 // disallow use of eval()-like methods
    "no-labels": 1,                       // disallow use of labeled statements
    "no-iterator": 1,                     // disallow usage of __iterator__ property
    "no-lone-blocks": 1,                  // disallow unnecessary nested blocks
    "no-loop-func": 0,                    // disallow creation of functions within loops
    "no-multi-str": 0,                    // disallow use of multiline strings
    "no-native-reassign": 0,              // disallow reassignments of native objects
    "no-new": 1,                          // disallow use of new operator when not part of the assignment or comparison
    "no-new-func": 1,                     // disallow use of new operator for Function object
    "no-new-wrappers": 1,                 // disallows creating new instances of String,Number, and Boolean
    "no-octal": 1,                        // disallow use of octal literals
    "no-octal-escape": 1,                 // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-proto": 1,                        // disallow usage of __proto__ property
    "no-redeclare": 1,                    // disallow declaring the same variable more then once
    "no-return-assign": 1,                // disallow use of assignment in return statement
    "no-script-url": 1,                   // disallow use of javascript: urls.
    "no-self-compare": 1,                 // disallow comparisons where both sides are exactly the same
    "no-sequences": 1,                    // disallow use of comma operator
    "no-unused-expressions": 0,           // disallow usage of expressions in statement position
    "no-void": 1,                         // disallow use of void operator
    "no-warning-comments": 0,             // disallow usage of configurable warning terms in comments e.g. TODO or FIXME
    "no-with": 1,                         // disallow use of the with statement
    "radix": 1,                           // require use of the second argument for parseInt()
    "vars-on-top": 0,                     // requires to declare all vars on top of their containing scope
    "wrap-iife": 0,                       // require immediate function invocation to be wrapped in parentheses
    "yoda": 1,                            // require or disallow Yoda conditions
    "strict": 0,                          // this rule conflicts with 'use-babel' so we'll just disable it

    // Variables

    "no-catch-shadow": 1,                 // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    "no-delete-var": 1,                   // disallow deletion of variables
    "no-label-var": 1,                    // disallow labels that share a name with a variable
    "no-shadow": 0,                       // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 1,      // disallow shadowing of names such as arguments
    "no-undef": 1,                        // disallow undeclared variables
    "no-undefined": 0,                    // disallow use of undefined variable
    "no-undef-init": 0,                   // disallow use of undefined when initializing variables
    "no-unused-vars": 1,                  // disallow declaration of variables that are not used in the code
    "no-use-before-define": 0,            // disallow use of variables before they are defined

    // Node.js

    "handle-callback-err": 1,             // enforces error handling in callbacks
    "no-mixed-requires": 1,               // disallow mixing regular variable and require declarations
    "no-new-require": 1,                  // disallow use of new operator with the require function
    "no-path-concat": 1,                  // disallow string concatenation with __dirname and __filename
    "no-process-exit": 0,                 // disallow process.exit()
    "no-restricted-modules": 1,           // restrict usage of specified node modules
    "no-sync": 0,                         // disallow use of synchronous methods

    // Stylistic (these rules are purely matters of style and are quite subjective)

    "key-spacing": 0,
    "comma-spacing": 0,
    "no-multi-spaces": 0,
    "brace-style": [                      // enforce one true brace style
      1, "1tbs", {
        "allowSingleLine": false
      }
    ],
    "camelcase": [                        // require camel case names
      1, {"properties": "never"}
    ],
    "consistent-this": [1, "self"],       // enforces consistent naming when capturing the current execution context
    "eol-last": 1,                        // enforce newline at the end of file, with no multiple empty lines
    "func-names": 0,                      // require function expressions to have a name
    "func-style": 0,                      // enforces use of function declarations or expressions
    "new-cap": 0,                         // require a capital letter for constructors
    "new-parens": 1,                      // disallow the omission of parentheses when invoking a constructor with no arguments
    "no-nested-ternary": 0,               // disallow nested ternary expressions
    "no-array-constructor": 1,            // disallow use of the Array constructor
    "no-lonely-if": 0,                    // disallow if as the only statement in an else block
    "no-new-object": 1,                   // disallow use of the Object constructor
    "no-spaced-func": 1,                  // disallow space between function identifier and application
    "semi-spacing": 1,                    // disallow space before semicolon
    "no-ternary": 0,                      // disallow the use of ternary operators
    "no-trailing-spaces": 1,              // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 0,            // disallow dangling underscores in identifiers
    "no-extra-parens": [1, "functions"],  // disallow wrapping of non-IIFE statements in parens
    "no-mixed-spaces-and-tabs": 1,        // disallow mixed spaces and tabs for indentation
    "indent": [1, 2, {"SwitchCase": 1}],  // indentation should be two spaces
    "quotes": [                           // enforce single quotes, allow double to avoid escaping ("don't escape" instead of 'don\'t escape')
      1, "single", "avoid-escape"
    ],
    "quote-props": [1, "as-needed"],      // require quotes around object literal property names
    "semi": 1,                            // require or disallow use of semicolons instead of ASI
    "sort-vars": 0,                       // sort variables within the same declaration block
    "keyword-spacing": 1,            // require a space after certain keywords
    "space-before-blocks": 1,             // require a space before blocks
    "space-before-function-paren": [      // disallow a space before function parenthesis
      1, "never"
    ],
    "object-curly-spacing": [             // disallow spaces inside of curly braces in object literals
      1, "never"
    ],
    "array-bracket-spacing": [            // disallow spaces inside of curly braces in array literals
      1, "never"
    ],
    "space-in-parens": 1,                 // require or disallow spaces inside parentheses
    "space-infix-ops": 1,                 // require spaces around operators
    "keyword-spacing": 1,         // require a space after return, throw, and case
    "space-unary-ops": 1,                 // require a space around word operators such as typeof
    "max-nested-callbacks": 0,            // specify the maximum depth callbacks can be nested
    "one-var": [1, "never"],              // allow just one var statement per function
    "wrap-regex": 0,                      // require regex literals to be wrapped in parentheses

    // Legacy (included for compatibility with JSHint and JSLint. While the names of the rules may not match up with the JSHint/JSLint counterpart, the functionality is the same)

    "max-depth": 0,                       // specify the maximum depth that blocks can be nested
    //"max-len": [                        // specify the maximum length of a line in your program [warning level, max line length, number of characters to treat a tab as]
    //  1, 100, 2, {
    //    "ignoreUrls": true,
    //    "ignorePattern": "^\\s*(import\\s[^{]+from|(var|const|let)\\s[^{]+=\\s*require\\s*\\()"
    //  }
    //],
    "max-params": 0,                      // limits the number of parameters that can be used in the function declaration.
    "max-statements": 0,                  // specify the maximum number of statement allowed in a function
    "no-bitwise": 0,                      // disallow use of bitwise operators
    "no-plusplus": 0                      // disallow use of unary operators, ++ and --

  }
}
