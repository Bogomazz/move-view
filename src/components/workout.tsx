import React, { useMemo, memo } from 'react';
import { PoseState } from '../models/pose-state';
import { PoseItem } from './pose-item';

export interface WorkoutProps {
    poses: PoseState[];
}

function Component(props: WorkoutProps): React.ReactElement {
    const style = {
        display: 'flex',
        width: '100%',
        flexDirection: 'row' as 'row',
        // justifyContent: 'center',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        overflowX: 'scroll' as const,
        // overflowY: 'hidden' as const,
    }

    return (
        <div style={style}>
            {props.poses.sort((a,b) => a.order - b.order).map((pose, i) => <PoseItem pose={pose} key={i} />)}
        </div>
    );
}

export const Workout = memo(Component);
