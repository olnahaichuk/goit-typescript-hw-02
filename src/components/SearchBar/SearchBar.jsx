import { useState } from "react"
import { toast } from 'react-hot-toast'
import css from './SearchBar.module.css'

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(query.trim() === '' ){
          toast('Write a word!', {
  icon: '❗',
});;
          return;

        } else {
          onSubmit(query);
          setQuery('');
      }
         
     }


    return (
      <>
    <header>
          <form
            className={css.searchForm}
            onSubmit={handleSubmit}>
            <input
              className={css.searchInput}
             type="text"
              autoFocus
              autoComplete="off"
              value={query}
              placeholder="Search images and photos"
              onChange={(e)=>setQuery(e.target.value)}
    />
    <button type="submit" className={css.searchBtn}>Search</button>
  </form>
</header>
</>
  )
}

export default SearchBar
