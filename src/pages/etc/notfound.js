import React from 'react';
import {Link} from 'react-router-dom';

export const Notfound = () => {
  return (
    <>
      <h1>Not found 404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to='/'>Home</Link>
    </>
  )
}