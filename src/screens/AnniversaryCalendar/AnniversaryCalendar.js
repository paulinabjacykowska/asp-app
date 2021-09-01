import { selectAllAnniversaryPosts } from '../../store/anniversaryPosts';
import AnniversaryCalendarItem from './AnniversaryCalendarItem';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const AnniversaryCalendar = () => {
  const anniversaryPosts = useSelector(selectAllAnniversaryPosts);

  return (
    <ScrollView>
      {anniversaryPosts.map((post, index) => (
        <AnniversaryCalendarItem key={post.id} post={post} index={index} />
      ))}
    </ScrollView>
  );
};

export default AnniversaryCalendar;
