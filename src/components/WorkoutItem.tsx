import { Workout } from '../models/workout';
import React from 'react';
import { Link } from 'react-router-dom';

type WorkoutItemProps = {workout: Workout};

export function WorkoutItem({workout}: WorkoutItemProps) {

  const image = (source: string, index: number) => {
    return (
      <div style={{
        height: 50,
        width: 50,
        border: 'thin solid black',
        borderRadius: 15,
        marginRight: 5,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        
      }}
      key={index}
      >
        <img 
          src={source} 
          alt='from workout'
          style={{
            maxWidth: '95%',
            maxHeight: '95%',
            height: 'auto',
            borderRadius: 15,
          }}
        />
      </div>
    )
  } 


  return (
    <div style={{
      borderBottom: 'thin solid grey',
      // marginBottom: 15
    }}>
      <h3 style={{marginBottom: 5}}>{workout.name}</h3>
      <div style={{
        overflowX: 'scroll',
        display: 'flex',
        marginBottom: 3
      }}>
        {
          workout.poses.map(image)
        }
      </div>

      <div style={{marginBottom: 10}}>
        Author: <Link to={'/workouts'}>{workout.author}</Link>
      </div>
    </div>
  )
}