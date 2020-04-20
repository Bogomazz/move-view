import { PoseState } from "../models/pose-state";
import React from 'react';

export function PoseItem({pose}: {pose: PoseState}) {
    const borderColor = pose.status === 'blocked' ? 'grey' : pose.status === 'inprogress' ? 'blue' : 'green';
    const side = pose.status === 'inprogress' ? 170 : 150;
    const style = {
        height: side, 
        width: side, 
        borderWidth: 2, 
        borderStyle: 'solid', 
        borderColor, 
        margin: 'auto',
        marginRight: 10,
        flexShrink: 0
    }
    return <img  style={style} src={pose.img} />
}