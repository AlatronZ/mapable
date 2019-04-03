import React from 'react';

const SearchForm = (props) => (
    <form>
        <legend>Put Address Finder here</legend>
        <input
            autoFocus
            type="text"
            name="address"
            //onChange={props.onChangeAddress}
            placeholder="Enter an address"
        />
        <button>Submit</button>
    </form>
)

export default SearchForm