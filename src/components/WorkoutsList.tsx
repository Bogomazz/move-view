import React from "react";
import { useStore } from "../store";
import { Link } from 'react-router-dom';
import { WorkoutItem } from "./WorkoutItem";

export function WorkoutsList() {

  const wourkouts = useStore(s => s.workouts);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '800px',
        overflow: 'scroll',
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>
            List of available workouts:
          </h1>

          <div>
            <input style={{height: 20, width: 120}} type="text" />
            <button style={{borderRadius: 0, height: '25px'}}>Search</button>
          </div>
        </div>

        <div>
          {
            wourkouts.map((w, i) => {
              return (
              <Link key={i} to={`/checker/${w.id}`}>
                <WorkoutItem workout={w} />
              </Link>
              );
            })
          }

        </div>


      </div>
    </div>
  )
}