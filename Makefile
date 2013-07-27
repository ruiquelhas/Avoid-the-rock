REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		-R $(REPORTER) \
		-r expect.js \
		-t 5000 \
		--recursive

.PHONY: test
