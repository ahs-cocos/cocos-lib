import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Feed, Icon, Divider, Label} from "semantic-ui-react";
import moment from "moment";
import {ApplicationPath} from "../../config/path";

const CommentFeedRenderer = ({comment, cocosUser, onDeleteComment}) => {

    //const [thumbCollection, setThumbCollection] = useState([])
    const [thumbedByMe, setThumbedByMe] = useState(false)
    //const [thumbCount, setThumbCount] = useState()
    const [thumbsLabel, setThumbsLabel] = useState('')
    const [isOwner, setIsOwner] = useState()
    const [avatarLink, setAvatarLink] = useState()

    useEffect(() => {
        if (!comment.thumbs) comment.thumbs = ''

        const coll = comment.thumbs.split(',').filter(t => t !== '')
        const tbm = coll.indexOf(cocosUser.id) > -1
        const tc = tbm ? coll.length-1 : coll.length
        console.log('COLL', coll)
        //setThumbCollectioncoll
        setThumbedByMe(tbm)
        //setThumbCount(tc)

        let tl = 'No thumbs yet'

        if (coll.length > 0){
            tl = tc + ' users thumbed this'
            if (tbm) tl = `You and ${tc} others`
        }

        setThumbsLabel(tl)

        const owner = comment.author > 0 ? comment.author === cocosUser.id : comment.author_display_name === cocosUser.email
        setIsOwner(owner)
        const img = comment.author_photo_url !== '' ? comment.author_photo_url : ApplicationPath.assetsFolder + 'no_user.png'
        setAvatarLink(img)
    }, [comment, cocosUser])

    return (
        <Feed.Event>
            <Feed.Label image={avatarLink}/>
            <Feed.Content>
                <Feed.Summary>
                    <a href='# '>{comment.author_display_name}</a>
                    <Feed.Date>{moment(comment.date).format('MMM, DD YYYY HH:mm')}</Feed.Date>
                </Feed.Summary>

                <Feed.Meta>
                    <Label>{comment.context}</Label>
                </Feed.Meta>
                {comment.contextDetail && <Feed.Meta>
                    <Label>{comment.contextDetail}</Label>
                </Feed.Meta>}

                <Feed.Extra text>
                    {comment.comment}
                </Feed.Extra>
                <Feed.Meta>
                    {isOwner && <a href='# ' onClick={() => onDeleteComment(comment)}>Delete comment</a>}
                </Feed.Meta>
                <Feed.Event>
                    <Feed.Like>
                        <Icon name='thumbs up outline' color={thumbedByMe ? 'green' : 'grey'}/>{thumbsLabel}
                    </Feed.Like>
                </Feed.Event>
            </Feed.Content>
            <Divider/>
        </Feed.Event>
    )
}

export default CommentFeedRenderer

CommentFeedRenderer.propTypes = {
    comment: PropTypes.object.isRequired,
    cocosUser: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func
}

CommentFeedRenderer.defaultProps = {}