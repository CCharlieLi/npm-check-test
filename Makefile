ENV = NODE_ENV=nctest
MOCHA_OPTS = -b --timeout 10000 --reporter spec
TESTS = test/*.test.js
NODE_BIN = ./node_modules/.bin
MOCHA = $(NODE_BIN)/_mocha
ISTANBUL = $(NODE_BIN)/istanbul
COVERALLS = $(NODE_BIN)/coveralls


lint:
	@$(NODE_BIN)/jscs lib test
lint-fix:
	@$(NODE_BIN)/jscs lib test --fix
test:
	@echo "Linting..."
	@make lint-fix
	@make lint
	@echo "Testing..."
	@$(ENV) $(MOCHA) $(MOCHA_OPTS) $(TESTS)
test-cov:
	@echo "Linting..."
	@make lint-fix
	@make lint
	@echo "Testing..."
	@$(ENV) $(ISTANBUL) cover $(MOCHA) -- $(MOCHA_OPTS) $(TESTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(COVERALLS) --verbose
unit:
	@echo "Unit testing"
	@make lint-fix
	@make lint
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTS) $(path)
.PHONY: lint lint-fix test test-cov unit test-coveralls

