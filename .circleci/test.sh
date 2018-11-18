#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=fef2f774d0d131543fc791f29cc0d9e84a566131\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/maximoleinyk/myapp/tree/master