const Prismic = require("@prismicio/client");
const fetch = require("node-fetch");

var apiEndpoint = "https://netlifyswag.cdn.prismic.io/api/v2";

const buildHooks = {
  en: "https://api.netlify.com/build_hooks/60ece721ccc8c3501d62be62",
  es: "https://api.netlify.com/build_hooks/60ece7d77f8b5c5235bd67f3",
};

exports.handler = async (event, context) => {
  console.log(event);
  console.log(context);
  const documentId = JSON.parse(event.body).documents[0];
  if (documentId) {
    const api = await Prismic.client(apiEndpoint);
    const document = await api.getByID(documentId);
    const lang = document.lang;
    const buildHook = buildHooks[lang.split("-")[0]];
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
