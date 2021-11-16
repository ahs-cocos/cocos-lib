import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import SortableTree, {addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree, changeNodeAtPath} from 'react-sortable-tree'
import {Popup, Icon} from "semantic-ui-react";
import CustomTheme from "cocos-outline-base-theme";


const CourseOutline = ({
                           courseOutline,
                           editable,
                           deleteNodeWarning,
                           deleteCheckFunction,
                           onTreeUpdate,
                           onNodeSelect,
                           renderer,
                           publicationClassFunction
                       }) => {

    const [treeData, setTreeData] = useState(courseOutline)
    const [selectedNodeIndex, setSelectedNodeIndex] = useState(null)

    useEffect(() => {
        setTreeData(treeData)
    }, [selectedNodeIndex, treeData])

    const treeChange = (tData) => {
        setTreeData(tData)
    }

    const nodeClick = (event, rowInfo) => {
        event.stopPropagation()
        //don't change the selectedNodeIndex when expanding or collapsing
        if (event.target.tagName === 'BUTTON') return

        setSelectedNodeIndex(rowInfo.node.id)
        onNodeSelect && onNodeSelect(rowInfo.node)
    }

    const onOutsideClick = (event) => {
        setSelectedNodeIndex(null)
        onNodeSelect && onNodeSelect()
    }

    const truncateTitle = (node) => {

        if (!node) return
        const ts = node.id + ' - '
        if (node.title.length > 30) return ts + node.title.substr(0, 30) + '...'
        return ts + node.title
    }

    const getNodeKey = ({treeIndex}) => treeIndex

    const editNodeTitle = (rowInfo) => {
        const title = prompt('Enter title', rowInfo.node.title)

        if (!title) return

        const res = changeNodeAtPath({
            treeData,
            path: rowInfo.path,
            getNodeKey,
            newNode: {
                ...rowInfo.node, title
            }
        })
        setTreeData(res)
        onTreeUpdate && onTreeUpdate(res)
    }

    const addNode = (rowInfo) => {

        const title = prompt('Enter title', 'New node')

        if (!title) return

        const flatData = getFlatDataFromTree(
            {treeData, getNodeKey, ignoreCollapsed: false}
        )
        //generate new index
        const newIndex = flatData.reduce((acc, data) => {
            if (data.node.id > acc) return data.node.id
            return acc
        }, 0) + 1

        const res = addNodeUnderParent({
            treeData,
            parentKey: rowInfo.path[rowInfo.path.length - 1],
            expandParent: true,
            getNodeKey,
            newNode: {
                id: newIndex,
                title,
            }
        })
        setTreeData(res.treeData)
        onTreeUpdate && onTreeUpdate(res.treeData)

        //heel even wachten tot de nieuwe index effectief bestaat
        setTimeout(() => setSelectedNodeIndex(newIndex), 50)
    }

    const deleteNode = (rowInfo) => {
        //no delete if node has children
        if (rowInfo.node.children && rowInfo.node.children.length > 0) {
            alert('This item has sub items. Please remove them first')
            return
        }

        //deleteCheckFunction
        const allowDelete = deleteCheckFunction ? deleteCheckFunction(rowInfo.node) : true

        if (allowDelete) {
            const answer = window.confirm(deleteNodeWarning)
            if (answer) {
                const res = removeNodeAtPath({
                    treeData,
                    path: rowInfo.path,
                    getNodeKey,
                })
                setTreeData(res)
                onTreeUpdate && onTreeUpdate(res)
            }
        }
    }

    return (
        <div style={{height: '200px', flexGrow: 1, disabled: true}} onClick={onOutsideClick}>
            <SortableTree
                theme={CustomTheme}
                treeData={treeData}
                onChange={treeChange}
                onMoveNode={({treeData}) => onTreeUpdate && onTreeUpdate(treeData)}
                canDrag={editable}
                getNodeKey={getNodeKey}
                generateNodeProps={
                    rowInfo => {
                        publicationClassFunction && publicationClassFunction(rowInfo)
                        const selected = rowInfo.node.id === selectedNodeIndex
                        const flatData = getFlatDataFromTree(
                            {treeData, getNodeKey, ignoreCollapsed: false}
                        )
                        const ro = {
                            className: selected ? 'node-selected' : '',
                            onClick: (event) => nodeClick(event, rowInfo),
                            title: truncateTitle(rowInfo.node),
                        }

                        if (selected && editable) {
                            ro.buttons = [
                                <Popup mouseEnterDelay={500}
                                       trigger={<Icon className='node-outline-button' color='grey' name='add' onClick={() => addNode(rowInfo)}/>}
                                       content='Create a new outline item under this one' size='mini'
                                />,
                                <Popup mouseEnterDelay={500}
                                       trigger={<Icon className='node-outline-button' color='grey' name='pencil' onClick={() => editNodeTitle(rowInfo)}/>}
                                       content='Edit this outline title' size='mini'
                                />,

                            ]

                            if (flatData.length > 1) {
                                ro.buttons.push(
                                    <Popup mouseEnterDelay={500}
                                           trigger={<Icon className='node-outline-button' color='red' name='trash' onClick={() => deleteNode(rowInfo)}/>}
                                           content='Delete the outline item' size='mini'
                                    />
                                )
                            }
                        }
                        return ro
                    }
                }
            />
        </div>
    )
}

export default CourseOutline

CourseOutline.propTypes = {
    courseOutline: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    deleteNodeWarning: PropTypes.string,
    deleteCheckFunction: PropTypes.func,
    onTreeUpdate: PropTypes.func,
    onNodeSelect: PropTypes.func,
    renderer: PropTypes.object,
    publicationClassFunction: PropTypes.func
}

CourseOutline.defaultProps = {
    editable: false,
    deleteNodeWarning: 'Are you sure you want to remove this item?'
}