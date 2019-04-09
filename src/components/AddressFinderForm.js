import React from 'react';
import AddressFinderInput from './AddressFinderInput';

/*
 * The form component which connects to AddressFinder functionality
 */
const AddressFinderForm = ({ handleMapData }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        //could add extra functionality here later
    }

    return (
        <div>
            <form
                className="address-form"
                onSubmit={handleOnSubmit}
            >
                <AddressFinderInput handleMapData={handleMapData} />
                <button disabled={true}>Submit</button>
            </form>
        </div>
    )
}

export default AddressFinderForm