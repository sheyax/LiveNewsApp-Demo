import React from 'react';
import {categories} from "../constants"
import fetchNews from '../lib/fetchNews';
import NewsList from './NewsList';
import response from '../response.json'

export default async function Hompage() {

    //fetch the news data
    const news: NewsResponse= response || await fetchNews(categories.join(','));

    
  return (
    <div>
        {/* NewsList news */}
        <NewsList news={news}/>
    </div>
  );
}
