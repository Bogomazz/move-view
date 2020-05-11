import React from "react";
import { Link } from "react-router-dom";

export function Header() {

  const UnAuthNavItems = <Link to='/auth'>Sign In</Link>;
  const AuthNavItems = (
    <div style={{display: 'flex'}}>
      <Link style={{marginRight: 5, paddingRight: 5, borderRight: 'thin solid black' }} to='/create'>Create workout</Link>
      <Link style={{marginRight: 5, paddingRight: 5, borderRight: 'thin solid black' }} to='/'>My workouts</Link>
      <Link to='/auth'>Sign Out</Link>
    </div>
  )

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 1px 1px black',
    }}>

      <Link style={{
        textDecoration: 'none',
        color: 'inherit',
      }} to='/'>
        <div style={{ margin: '20px' }}>
          WorkoutChecker
          </div>
      </Link>

      <div style={{ margin: '20px' }}>
        {UnAuthNavItems}
      </div>
    </div>
  )
}