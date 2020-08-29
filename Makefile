clean:
	@rm -rf ./dist

build: clean
	@node_modules/.bin/babel --config-file ./.babelrc . -d ./dist
