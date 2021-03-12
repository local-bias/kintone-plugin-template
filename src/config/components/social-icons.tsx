import React from 'react';
import styled from '@emotion/styled';
import { Fab, Tooltip } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';

import { URL_HOMEPAGE, URL_TWITTER, URL_GITHUB } from '@common/constants';

const openNewTab = (path: string) => window.open(path, '_blank');

const Icon: React.FC<{ title: string; url: string }> = ({ children, title, url }) => (
  <Tooltip title={title} aria-label={title}>
    <Fab size='small' onClick={() => openNewTab(url)}>
      {children as any}
    </Fab>
  </Tooltip>
);

const Component: React.FCX = ({ className }) => (
  <aside className={className}>
    <Icon title='ホームページ' url={URL_HOMEPAGE}>
      <HomeIcon />
    </Icon>
    <Icon title='ツイッター' url={URL_TWITTER}>
      <TwitterIcon />
    </Icon>
    <Icon title='GitHub' url={URL_GITHUB}>
      <GitHubIcon />
    </Icon>
  </aside>
);

const StyledComponent = styled(Component)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  & > button {
    color: #78909c;
    margin: 4px;
    box-shadow: none;
  }
`;

export default StyledComponent;
