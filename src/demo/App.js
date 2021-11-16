import React, {useState, useEffect} from 'react';
import { CourseOutline, CocosHeader } from '../lib';
import {Checkbox} from "semantic-ui-react";
import './index.css'
import CocosFooter from "../lib/component/CocosFooter";

const App = () => {

    const [courseOutline, setCourseOutline] = useState()
    const [editable, setEditable] = useState(true)

    useEffect(() => {
        const treeData = [
            { id: 1, classes: 'test-class', selected: true, title: 'Dit is een node met een lange titel,\n want een hoodstuk kan een lange titel hebben', children: [{ id: 3, title: 'Egg' }] },
            { id: 2, title: 'Fish', children: [{id: 4, title: 'fingerline'}] }
        ]

        setCourseOutline(treeData)
    }, [])

    if (!courseOutline) return null

    const deleteCheckFunction = (node) => {

        //prohibit delete if node has content attached to it
        return true
    }

    const onTreeUpdate = (treeData) => {
        const jsonTreeData = JSON.stringify(treeData)
        console.log('UPDATING', jsonTreeData)
    }

    return (
        <div>
            <CocosHeader>
                <div>Hello child!</div>
            </CocosHeader>
                           <CocosFooter>

                           </CocosFooter>
        </div>
    )
};

export default App;
