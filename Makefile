# required executables
BROWSERIFY = ./node_modules/.bin/browserify
MOCHA = ./node_modules/.bin/mocha

# browserify inputs
INPUT_SCREEN_CONTROLLER = ./public/javascripts/controllers/screenController.js
INPUT_DRIVER_CONTROLLER = ./public/javascripts/controllers/driverController.js

# browserify outputs
OUTPUT_SCREEN_CONTROLLER = ./public/javascripts/compiled/screenController.js
OUTPUT_DRIVER_CONTROLLER = ./public/javascripts/compiled/driverController.js

# mocha related stuff
REPORTER = spec
TIMEOUT = 5000

build:
	$(BROWSERIFY) \
		$(INPUT_SCREEN_CONTROLLER) > $(OUTPUT_SCREEN_CONTROLLER);
	$(BROWSERIFY) \
		$(INPUT_DRIVER_CONTROLLER) > $(OUTPUT_DRIVER_CONTROLLER)

test:
	@NODE_ENV=test $(MOCHA) \
		-R $(REPORTER) \
		-r expect.js \
		-t $(TIMEOUT) \
		--recursive

.PHONY: build
