import React from 'react';
import AddressFinderInput from './AddressFinderInput';

/*
 * The form component which connects to AddressFinder functionality
 */
export default class SearchForm extends React.Component {

    handleOnSubmit = (e) => {
        e.preventDefault();
        //could add extra functionality here later
    }

    render() {
        return (
            <div>
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