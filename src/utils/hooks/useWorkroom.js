import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkroomById, selectWorkroomById } from '../../store/workrooms';
import { useEffect } from 'react';

const useWorkroom = workroomId => {
  const { workroom, loading } = useSelector(selectWorkroomById(workroomId));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkroomById(workroomId));
  }, [workroomId]);

  return [workroom, loading];
};

export default useWorkroom;
