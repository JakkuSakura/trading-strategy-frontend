#!/bin/bash -xe
URL="$1"
shift
OPENAPI_PATH=node_modules/openapi.json
curl "$URL" | jq > $OPENAPI_PATH
npx openapi-typescript $OPENAPI_PATH --output src/lib/schema.d.ts

