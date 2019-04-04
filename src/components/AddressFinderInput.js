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

    //Can overlook clearing on focus as addressfinder is based on select
    clearTextOnClick = (e) => {
        e.target.value = ''
    }

    componentDidMount() {
        scriptjs.get('https://api.addressfinder.io/assets/v3/widget.js', () => {
            let widget = new AddressFinder.Widget(
                document.getElementById('address_line'),
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
                id="address_line"
                className="address-bar__input"
                autoFocus
                onFocus={this.clearTextOnClick}
                type="text"

                placeholder="Enter an address"
            />
        )
    }
}