import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai';

export const Search = () => {
    let dispatch = useDispatch()
    const {search} = useSelector((state) => ({...state}));
    const {text} = search
    const navigate = useNavigate();

    const handleChange = (e) =>{
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: e.target.value},
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/shop?${text}`);
    }

  return (
    <div>
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit} >
            <input onChange={handleChange} type='search' value={text} className='form-control mr-sm-2' placeholder='Search'/>
            <AiOutlineSearch onClick={handleSubmit} color="red" />
        </form>
        {/* <div class="input-group">
            <div class="form-outline">
            <input type="search" id="form1" class="form-control" />
            <label class="form-label" for="form1">Search</label>
        </div>
        <button type="button" class="btn btn-primary">
            <i class="fas fa-search"></i>
        </button>
    </div> */}
    </div>
  )
}
