export interface ListItemData {
  id: string;
  title: string;
  subtitle: string;
}

export const sampleData: ListItemData[] = [
  { id: '1', title: 'React Native FlatList', subtitle: 'High performance list component' },
  { id: '2', title: 'keyExtractor Prop', subtitle: 'Extracts unique string keys for items' },
  { id: '3', title: 'ListHeaderComponent', subtitle: 'Renders at the top of the list' },
  { id: '4', title: 'ItemSeparatorComponent', subtitle: 'Renders between items automatically' },
  { id: '5', title: 'ListEmptyComponent', subtitle: 'Displayed when data array is empty' },
];