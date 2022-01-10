const article = {
  author: '',
  category: '',
  content: '',
  created: '',
  description: '',
  publishedAt: '',
  source: '',
  title: '',
  url: '',
  urlToImage: '',
};

export const initialState = {
  user: {
    email: '',
    firstName: '',
  },
  articles: { data: [article], isLoading: true },
  openDrawer: false,
  category: { name: 'general', label: 'General' },
};

export default function custReducer(state, action) {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.user };
    }
    case 'SET_OPEN_DRAWER': {
      return { ...state, openDrawer: action.openDrawer };
    }
    case 'SET_CATEGORY': {
      return { ...state, category: action.category };
    }
    case 'SET_ARTICLES': {
      return { ...state, articles: action.articles };
    }
    default: {
      return state;
    }
  }
}
