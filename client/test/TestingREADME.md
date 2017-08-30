#Intro

This is Sam's testing README. 

BE AWARE! Testing the front end is significantly more difficult than testing the backend. 

You will need to replicate your actual production environment, and it can be very tricky. 

TESTING IS FRAGILE. I have listed every change that I made below. Stuff will break, if you add/change stuff in our testing configuration, please document it below, as it may need modified in the future. 

We are going to use Jest and Enzyme. 
Jest is the actual Facebook testing suite for React, and allows us to take snapshot tests to ensure visual consistency when we are building our application. 

Enzyme is used to test React Components. It is good for doing things such as ensuring that Component lifecyle methods are rendering correctly, ensuring that components are loading in the proper fashion, and ensuring that non-visual events such as click or on change events are properly firing. 

Both of these packages will be set up to run via npm test. 

sum.js && sum.test.js are just boilerplate tests to ensure that Jest is running. 

#Relevant file touches/setup.

-Added Jest npm-dev package. FYI, this gets wild. 
-Added jest to the package.JSON "scripts"
-Disabled Grunt testing. removed following line from Package.json script tag: 'NODE_ENV=test grunt test'
-Added babel-jest so that our jest build works with Babel. 
-Added ""es2015", "react"" to the package.JSON babel plugin settings.
-Added following to the .babelrc file   "plugins": [ "transform-es2015-modules-commonjs" ] 
-Added the following to the package.JSON so that Webpack works with Jest:  
    "jest": {
        "moduleNameMapper": {
          "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
          "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
        }
      }
-Added the following folder/files for Jest file mocking: __mocks__/fileMock.js && __mocks__/styleMock.js
-Added the following to the package.JSON:  "moduleFileExtensions": ["js", "jsx"], "moduleDirectories": ["node_modules", "shared"]
-Added "^react(.*)$": "<rootDir>/vendor/react-master$1", "^config$": "<rootDir>/configs/app-config.js", to Package.JSON
-Added "modulePaths": [ "/shared/vendor/modules"], to package.JSON. These need to be pointed at our react modules.  
-Added "presets": [ ["es2015", {"modules": false}]], "env": { "test": { "plugins": ["transform-es2015-modules-commonjs"]}} to .babelrc
-Added "transform:{}" under "jest" in the package.JSON.
-Added file __test__ to place Jest files inside of. 
This should set up Jest.

To add enzyme...

-Added Enzyme npm package.
-Added enzyme-to-json package. Jest can break enzyme, use enzyme-to-json to test enzyme and jest together correctly. 
-Added  externals: {'react/addons': true, 'react/lib/ExecutionEnvironment': true, 'react/lib/ReactContext': true, 'react-addons-test-utils': 'react-dom', },

-Right now I'm going to try and run with WITHOUT jsDOM, although that may need to be added later. 

#Bugs you may encounter. 

FILE PATHS MAY BE WRONG. IF YOU ARE GETTING ERRORS, LET ME KNOW, THAT IS PROBABLY THE ISSUE. 

THINGS ARE ORDERED FOR A REASON. If things break, peel them back one by one. 

Enzyme breaks when it comes across files that are not JS. If you have non JS files in your client folder, build a ignore-utils.js file and use the require-hacker npm package to mock them out. 

Redux has a tendency to break Enzyme. If this happens, you need to add the redux-mock-store.  

The CSS modules plugin will break Jest. If you add this package, follow the directions at the following link: https://facebook.github.io/jest/docs/en/webpack.html

If there are DOM issues, add jsdom to enzyme. 



#How to test.

Place Jest Tests within the 