import React from 'react';
import scriptjs from 'scriptjs';

/*
 * Use AddressFinder widget to access metadata (specifically GPS)
 * Connected to the rendered input tag
 * adapted from https://sites.google.com/a/abletech.co.nz/wiki/addressfinder/code-examples/react
 */
export default class AddressFinderField extends React.Component {
    constructor() {
        super()
        this.handleAddressSelect = this.handleAddressSelect.bind(this)
    }

    handleAddressSelect(fullAddress, metaData) {
        this.props.setMapData(fullAddress, metaData)
    }

    componentDidMount() {
        scriptjs.get('https://api.addressfinder.io/assets/v3/widget.js', () => {
            let widget = new AddressFinder.Widget(
                document.getElementById('address_line_1'),
                'ADDRESSFINDER_DEMO_KEY',
                'NZ',
                { show_locations: false }
            )

            widget.on('result:select', this.handleAddressSelect)
        })
    }

    componentWillUnmount() {
        // Clean up all the autocomplete elements
        let autocompletes = document.getElementsByClassName('af_list')
        for (let autocomplete of autocompletes) {
            autocomplete.parentElement.removeChild(autocomplete)
        }
    }

    render() {
        return (
            <input
                autoFocus
                className="address-bar__input"
                type="text"
                id="address_line_1"
                placeholder="Enter an address"
            />
        )
    }
}