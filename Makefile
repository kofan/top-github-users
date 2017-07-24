MAKE_FILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
DIRECTORY_PATH := $(patsubst %/,%,$(dir $(MAKE_FILE_PATH)))
CD = cd $(DIRECTORY_PATH) &&

.PHONY: all install test build clean serve

all: install build clean

install:
	$(CD) yarn install

test:
	$(CD) npm test

build:
	$(CD) npm run build-prod

clean:
	npm cache clean --force
	yarn cache clean

serve:
	$(CD) npm run serve-prod
