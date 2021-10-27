const Prismic = require("@prismicio/client");
const fetch = require("node-fetch");

var apiEndpoint = "https://next-i18n.prismic.io/api/v2";

const buildHooks = {
  "en-us": "https://api.netlify.com/build_hooks/6178b78f17ea0133ca602723",
  "de-de": "https://api.netlify.com/build_hooks/6178b7b9a309cd344ea5ccef",
  "es-es": "https://api.netlify.com/build_hooks/61797028c2577f3a90f059ad",
};

exports.handler = async (event, context) => {
  const documentId = JSON.parse(event.body).documents[0];
  if (documentId) {
    const api = await Prismic.client(apiEndpoint);
    const document = await api.getByID(documentId);
    const buildHook = buildHooks[document.lang];
    if (buildHook) {
      await fetch(buildHook, {
        method: "POST",
      });
    }
  }
  return {
    statusCode: 200,
  };
};
