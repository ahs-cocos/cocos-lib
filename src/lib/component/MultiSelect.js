import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Select} from "semantic-ui-react";

const MultiSelect = ({delimiterSeparatedDataString, delimiter, onChange}) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        if (!delimiterSeparatedDataString) return
        const dpArray = delimiterSeparatedDataString.split(delimiter)
        const opt = dpArray.map((value, index) => {
            return { key: index, text: value, value }
        })
        setOptions(opt)
    }, [delimiterSeparatedDataString, delimiter])

    const onSelectChange = (event, {value}) => {
        console.log('CHANGE', value)
        const str = value.join(delimiter)
        onChange && onChange(str)
    }
    const onAddItem = (event, {value}) => {
        console.log('ADD', options)
        setOptions([...options])
    }

    return (
        <Select
            additionLabel='add item: '
            fluid
            multiple
            search
            allowAdditions={true}
            value={options.map(option => option.value)}
            options={options}
            onChange={onSelectChange}
            onAddItem={onAddItem}
        />
    )
}

export default MultiSelect

MultiSelect.propTypes = {
    delimiterSeparatedDataString: PropTypes.string,
    delimiter: PropTypes.string,
    onChange: PropTypes.func
}

MultiSelect.defaultProps = {
    delimiter: ','
}