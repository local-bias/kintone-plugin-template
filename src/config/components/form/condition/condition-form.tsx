import React, { ChangeEventHandler, useState, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

import { appFieldsState, storageState } from '../../../states';
import { MenuItem, TextField } from '@material-ui/core';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: Properties;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Component: VFCX<Props> = ({ className, index, condition, appFields, onChange }) => (
  <div {...{ className }}>
    <div>
      <TextField select value={condition.field} {...{ onChange }}>
        {Object.values(appFields).map(({ code, label }, i) => (
          <MenuItem key={i} value={code}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const appFields = useRecoilValue(appFieldsState);
  const setStorage = useSetRecoilState(storageState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].field = e.target.value;
      })
    );
  };

  return <StyledComponent {...{ condition, index, appFields, onChange }} />;
};

export default Container;
