import React from "react";

import pose61Img from '../content/pose 61.png'
import pose62Img from '../content/pose 62.png'

export function CreateWorkout() {

  const images = [
    pose61Img,
    pose62Img,
  ]

  const image = (source: string, index: number) => {
    return (
      <div style={{
        height: 150,
        width: 150,
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
    <div>
      <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '800px',
        overflow: 'scroll',
      }}>
        <h1>
          Create new workout
        </h1>

        <div>
          <div style={{marginBottom: 10}}>
            <label>Write down label for workout: </label> <br />
            <input style={{height: 25, width: 300, fontSize: 14}} type='text' />
          </div>

          <div style={{marginBottom: 10}}>
            <label >Add images to workout </label> <br /> 
            <div style={{marginTop: 3, display: 'flex'}}>
              <div style={{
                height: 150,
                width: 150,
                border: '3px dashed grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: 15,
                marginRight: 5,
              }}>
                <svg color='grey' xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path fill="grey" d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
                Select files
              </div>

              {
                images.map(image)
              }
            </div>
          </div>

          <button style={{height: 35, width: 120, fontSize: 16}}>
            Save
          </button>

        </div>


      </div>
    </div>
    </div>
  )
}