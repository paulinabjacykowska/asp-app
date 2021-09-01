import { FlatList, RefreshControl } from 'react-native';
import ContentLoadingAnim from './ContentLoadingAnim';
import React from 'react';

const InfiniteFlatList = React.forwardRef(
  (
    {
      component: ListComponent = FlatList,
      data,
      isRefreshing,
      onRefresh,
      onLoadNext,
      hasMore,
      ...restProps
    },
    ref
  ) => {
    return (
      <ListComponent
        ref={ref}
        {...restProps}
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['black']}
            tintColor="black"
          />
        }
        onEndReached={onLoadNext}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          hasMore && (
            <ContentLoadingAnim style={{ width: '100%', marginBottom: -50 }} />
          )
        }
      />
    );
  }
);

export default InfiniteFlatList;
