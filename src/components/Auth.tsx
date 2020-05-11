import React from "react";

export function Auth() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh'
    }}>
      <div>
        <div style={{marginBottom: 10}}>
          <label>Nick name</label> <br />
          <input style={{height: 25, width: 300}} type='text' />
        </div>
        <div style={{marginBottom: 10}}>
        <label>Password</label> <br />
          <input style={{height: 25, width: 300}} type='password' />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button style={{height: 35, width: 120, fontSize: 16}}>Authorize</button>
          <button style={{height: 35, width: 120, fontSize: 16}}>Register</button>
        </div>
      </div>
    </div>
  )
}