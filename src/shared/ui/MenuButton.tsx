import React from 'react';
import {Icon} from '.';
import ContextMenu from 'react-native-context-menu-view';

const MenuButton = () => {
  return (
    <ContextMenu
      actions={[{title: 'Title 1'}, {title: 'Title 2'}]}
      onPress={e => {
        console.warn(
          `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
        );
      }}
      dropdownMenuMode={true}>
      <Icon name="EllipsisVertical" size={24} />
    </ContextMenu>
  );
};

export default MenuButton;
