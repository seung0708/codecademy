import './Home.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostsContainer from '../../features/posts/components/PostsContainer';
import Dropdown from '../../features/filter/components/Dropdown';
import { fetchSubredditsByCategory } from '../../features/filter/redux/filterSlice';
import { fetchPosts } from '../../features/posts/redux/postsSlice';

const Home = ({searchResults, searchLoading, searchError}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.filterData.categories);
  const {filteredPosts, filteredLoading, filteredError} = useSelector(state => state.filterData);
  const {posts, loading, error} = useSelector((state) => state.postsData);

  useEffect(() => {
    if(selectedCategory) {
      dispatch(fetchSubredditsByCategory(selectedCategory));
    } 
    dispatch(fetchPosts());
  }, [dispatch, selectedCategory]);

  return (
    <section className="home">
      <div className="main-content">
        <aside></aside>
        <div className="content-area">
          <Dropdown categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          {filteredPosts.length > 0 && (
            <PostsContainer posts={filteredPosts} loading={filteredLoading} error={filteredError} />
          )}
          {searchResults.length > 0 && (
            <PostsContainer posts={searchResults} loading={searchLoading} error={searchError} />
          )}
          {posts.length > 0 && (
            <PostsContainer posts={posts} loading={loading} error={error} />
          )}
        </div>
        <aside className='categories-subreddits'>
          {/* <Subreddit /> */}
        </aside>
      </div>
    </section>
  )
}

export default Home