/** @type {import('eslint').Linter.Config} */  
const config = {  
    env: {  
        browser: true,  
        es2021: true,  
    },  
    extends: ["eslint:recommended"],  
    parserOptions: {  
        ecmaVersion: 12,  
    },  
    rules: {  
        
    },  
};  

module.exports = config;