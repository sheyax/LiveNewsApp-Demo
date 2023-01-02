import {gql} from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async ( 
    category?: Category | string,
    keywords?: string,
    isDynamic?:boolean) =>{
    // Graphql query
    const query = gql`
    query MyQuery (
        $access_key: String!
        $categories: String!
        $keywords: String
    )  {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries:"gb"
        sort: "published_desc"
        keywords: $keywords) {
        data {
          author
          category
          image
          description
          country
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

    // fetch function with Next.js 13 caching...
const res = await fetch("https://longmont.stepzen.net/api/sartorial-sparrow/__graphql", {
    method: 'POST',
    cache: isDynamic? "no-cache": "default",
    next: isDynamic? {revalidate: 0}: {revalidate: 20},
    headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
        query,
        variables:{
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords
        },
    })
});

console.log( "loading new api data for category>>", category, keywords)

const newsResponse = await res.json();

    // Sort function by images vs not images present
    const news= sortNewsByImage(newsResponse.data.myQuery)

    // return res
    return news;
}

export default fetchNews;


//stepzen import curl "http://api.mediastack.com/v1/news?access_key=f12b871255519b0bc0093a19a03bd442&sources=business,sports"