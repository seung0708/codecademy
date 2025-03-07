import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = ({posts, loading, error}) => {
    if (error) {
        return <div data-testid="error-message">Something went wrong</div>
    }

    return (
        <div>
            {loading && <div data-testid="loader" className='loader'></div>}
            {posts.map((post) => (
                <div key={post.id} className='posts-container'>           
                    <Post post={post} />
                </div>
            ))}
        </div>
    )
}

export default PostsContainer