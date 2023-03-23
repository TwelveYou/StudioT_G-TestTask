import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Error404() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: ''});
    console.log('домашняя страница');
  }, [dispatch])

  return (
    <div>Error404</div>
  )
}
