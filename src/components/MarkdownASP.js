import React from 'react';
import Markdown from 'react-native-markdown-display';
import { StyleSheet, Text, View } from 'react-native';
import ItemListDash from './ItemListDash';
import { GS_BOLD, GS_REGULAR } from '../constants/fonts';
import { ORANGE_ASP } from '../constants/colors';

export default function MarkdownASP({ text }) {
  const rules = {
    list_item: (node, children, parent, styles) => (
      <View style={stylesMarkdown.listItemStyle}>
        <View style={stylesMarkdown.dash}>
          <ItemListDash />
        </View>
        <Text key={node.key}>
          <Text style={stylesMarkdown.textInList}>{children}</Text>
        </Text>
      </View>
    ),
  };

  return (
    <Markdown
      rules={rules}
      style={{
        body: { fontSize: 14, fontFamily: GS_REGULAR },
        link: { color: ORANGE_ASP, textDecorationLine: 'none' },
        strong: { fontSize: 14, fontFamily: GS_BOLD },
      }}
    >
      {text}
    </Markdown>
  );
}

const stylesMarkdown = StyleSheet.create({
  dash: {
    paddingTop: 7,
    paddingRight: 10,
  },
  textInList: {
    flex: 1,
    marginRight: 19,
  },
  listItemStyle: {
    paddingBottom: 20,
    flexDirection: 'row',
    marginRight: 30,
  },
});
