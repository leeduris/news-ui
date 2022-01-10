import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import newsArticleStyle from '../../../styles/newsArticleStyle';
import NewsArticle from '../components/newsArticle';
import CircularIndeterminate from '../../mains/components/progressBar';
import custContext from '../../../contexts/custContext';
import { getArticleByCatetogy } from '../../articles/stores/graphql';


export default function News() {
  const classes = newsArticleStyle();
  const { state } = useContext(custContext);

  const { data, isLoading } = useQuery(
    ['news', state.category.name], async () => {
        const { data } = await getArticleByCatetogy(state.category.name);
        const articles = data.data.getArticleByCatetogy;
        return articles;
  });

  return (
      <div className={classes.all_news}>
        {isLoading ? 
          <CircularIndeterminate /> : 
          data.map(article => {
            return <NewsArticle data={article} key={article.url} />
          })
        }
      </div>
  )
}
