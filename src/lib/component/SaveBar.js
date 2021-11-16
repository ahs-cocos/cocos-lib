import React from 'react'
import PropTypes from 'prop-types'
import {Segment, Button} from 'semantic-ui-react'

const SaveBar = ({onCancelClick, onSaveClick, cancelButtonLabel, saveButtonLabel}) => (
        <Segment padded className='save-bar' textAlign='center' inverted tertiary>
            <Button size='tiny' onClick={onCancelClick}>{cancelButtonLabel}</Button>
            <Button type='submit' size='tiny' color='green' onClick={onSaveClick}>{saveButtonLabel}</Button>
        </Segment>
    )


SaveBar.propTypes = {
    onCancelClick: PropTypes.func,
    onSaveClick: PropTypes.func,
    cancelButtonLabel: PropTypes.string,
    saveButtonLabel: PropTypes.string
}

SaveBar.defaultProps = {
    cancelButtonLabel: 'Annuleer',
    saveButtonLabel: 'Bewaar'
}

export {SaveBar}