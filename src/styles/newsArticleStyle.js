import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const newsArticleStyle = makeStyles((theme) => ({
  root: {
    margin: 0,
    background: 'rgb(251, 254, 255)',
  },

  all_news: {
    margin: 10,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
  },

  news: {
    maxWidth: 500,
    padding: 30,
    border: 1,
    borderRadius: 5,
  },

  news_title: {
    paddingBlock: 10,
    borderBottom: 1,
  },

  news_desc: {
    paddingTop: 10,
    lineHeight: 25,
    fontSizeAdjust: 14,
  },

  news_author: {
    marginRight: 10,
    color: 'purple',
  },

  news_published: {
    display: 'inline-block',
    marginTop: 10,
    color: 'rgb(122, 122, 122)',
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },

  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default newsArticleStyle;
