import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Characters() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
    console.log('домашняя страница');
  }, [dispatch])

  return (
    <div>Characters</div>
  )
}
