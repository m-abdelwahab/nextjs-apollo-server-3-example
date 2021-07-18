# Reproduction

Doing a default export throws the following error:

```ts
export default apolloServer.start().then(() => {
  const apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });
  return cors((req: NextApiRequest, res: NextApiResponse) =>
    req.method === "OPTIONS" ? res.end() : apolloHandler(req, res)
  );
});
```

```bash
TypeError: resolver is not a function
    at apiResolver (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/api-utils.js:8:7)
    at DevServer.handleApiRequest (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:66:492)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async Object.fn (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:58:580)
    at async Router.execute (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/router.js:25:67)
    at async DevServer.run (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:68:1042)
    at async DevServer.handleRequest (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:32:504)
```

The solution is using `module.exports` instead.

I can't use Apollo Studio (My schema doesn't get imported)

Checking the network tab, a request is sent every second (as expected) but the `status` is `pending` and doesn't change.
<img width="1552" alt="DevTools" src="https://user-images.githubusercontent.com/27310414/126048755-b1fcecac-c280-4342-8285-628a04eabdbf.png">


I also get the following error:

```bash
Error: Invalid body
    at createError (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/micro/lib/index.js:20:14)
    at /Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/micro/lib/index.js:149:12
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async graphqlHandler (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/apollo-server-micro/dist/microApollo.js:31:22)
    at async ApolloServer.handleGraphqlRequestsWithServer (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/apollo-server-micro/dist/ApolloServer.js:86:34)
    at async /Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/apollo-server-micro/dist/ApolloServer.js:30:21
    at async apiResolver (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/api-utils.js:8:1)
    at async DevServer.handleApiRequest (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:66:462)
    at async Object.fn (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/next-server.js:58:580)
    at async Router.execute (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/next/dist/next-server/server/router.js:25:67) {
  statusCode: 400,
  originalError: ClientError [BadRequestError]: request aborted
      at IncomingMessage.onAborted (/Users/m-abdelwahab/Desktop/api-routes-graphql/node_modules/micro/node_modules/raw-body/index.js:231:10)
      at IncomingMessage.emit (events.js:315:20)
      at abortIncoming (_http_server.js:561:9)
      at socketOnEnd (_http_server.js:577:5)
      at Socket.emit (events.js:327:22)
      at endReadableNT (_stream_readable.js:1327:12)
      at processTicksAndRejections (internal/process/task_queues.js:80:21) {
    code: 'ECONNABORTED',
    expected: 1795,
    length: 1795,
    received: 0,
    type: 'request.aborted'
  }
}

```
