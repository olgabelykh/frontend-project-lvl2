install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff-version:
	node bin/gendiff.js -V

gendiff-help:
	node bin/gendiff.js -h
