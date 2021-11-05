// @ts-ignore
const {createProxyMiddleware} = require("http-proxy-middleware");

const HOST = "localhost";
const PORT = 8080;

function getOptions(protocol) {
        return {
            target: `${protocol}://${HOST}:${PORT}`,
        }
}

module.exports = function (app) {
    app.use(createProxyMiddleware("/api", getOptions("http")));
};
