import React from 'react';
import ContextMenu, {ContextMenuProps} from 'react-native-context-menu-view';
import { Icon } from './Icon/Icon';

const MenuButton = (props: ContextMenuProps) => {
  return (
    <ContextMenu dropdownMenuMode={props.dropdownMenuMode || true} {...props}>
      <Icon name="EllipsisVertical" size={24} />
    </ContextMenu>
  );
};

export default MenuButton;
