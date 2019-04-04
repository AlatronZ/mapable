import React from 'react';
import AddressFinderInput from './AddressFinderInput';

/*
 * The form component which connects to AddressFinder functionality
 */
export default class SearchForm extends React.Component {
    state = {
        error: undefined
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const error = this.props.searchAddress(address);

        this.setState(() => ({ error }))

        if (!error) {
            e.target.elements.address.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form
                    className="address-form"
                    onSubmit={this.handleOnSubmit}
                >
                    <AddressFinderInput setMapData={this.props.setMapData} />
                    <button disabled={true}>Submit</button>
                </form>
            </div>
        )
    }
}