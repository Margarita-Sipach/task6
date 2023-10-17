module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
	"ignorePatterns": ['.eslintrc.js', 'build'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script",
				"project": ['./tsconfig.json'],
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-floating-promises": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/strict-boolean-expressions": "warn",
		'max-len': ['error', { ignoreComments: true, code: 90 }],
		indent: ['warn', 4],
		"@typescript-eslint/indent": ['warn', 4],
    }
}
