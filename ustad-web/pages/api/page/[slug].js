// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// * Basically apiRoute is going to take in the slug and use that
// * as parameter for WPGraphQL response.

// * Request function to dictate what is going to dictate
// * what are we querying within the GraphQL.
export default async (req, res) => {
  const {
    query: { slug },
  } = req;

  const QUERY_SINGLE_POST =
    " query SinglePost($id: ID!) { page(id: $id, idType: URI) { title content} }";

  const data = await fetch(process.env.WORDPRESS_LOCAL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: slug,
      },
    }),
  });

  const json = await data.json();

  res.json(json.data); // return data;
};
