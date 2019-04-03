import React from 'react';

export default class SearchForm extends React.Component {
    state = {
        error: undefined
    }

    searchAddress = (e) => {
        e.preventDefault();

        const address = e.target.address.value.trim();
        const error = this.props.searchAddress(address);

        this.setState(() => ({ error }))

        if(!error) {
            e.target.elements.address.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form
                    className="address-bar"
                    onSubmit={this.searchAddress}
                >
                    <input
                        autoFocus
                        type="text"
                        name="address"
                        placeholder="Enter an address"
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}