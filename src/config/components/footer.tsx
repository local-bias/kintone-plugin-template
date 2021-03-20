import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import { ConfigContainer } from '../contexts';

const Component: React.VFCX = ({ className }) => {
  const { saveConfig } = ConfigContainer.useContainer();

  return (
    <div className={className}>
      <Button variant='contained' color='primary' onClick={() => saveConfig()} startIcon={<SaveIcon />}>
        設定を保存
      </Button>
      <Button variant='contained' onClick={() => history.back()} startIcon={<SettingsBackupRestoreIcon />}>
        変更しないで戻る
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 24px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;

  button {
    margin: 8px;
  }
`;

export default StyledComponent;
