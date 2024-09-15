import css from './LoadMoreBtn.module.css'

interface LoadMoreProps{
  onClick: () => Promise<void>;
}
const LoadMoreBtn : React.FC<LoadMoreProps>= ({onClick}) => {
  return (
    <button type="button"
      onClick={onClick}
    className={css.loadMore}
    >Load More</button>
  )
}

export default LoadMoreBtn
