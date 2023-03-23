import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Characters() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
  }, [dispatch])

  return (
    <div>Characters</div>
  )
}
