import React, { FCwC, FCX } from 'react';
import styled from '@emotion/styled';
import { Fab, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';

import { URL_HOMEPAGE, URL_TWITTER, URL_GITHUB } from '@common/static';

import GradientButton from './gradient-button';

const openNewTab = (path: string) => window.open(path, '_blank');

const Icon: FCwC<{ title: string; url: string }> = ({ children, title, url }) => (
  <Tooltip title={title} aria-label={title}>
    <Fab size='small' onClick={() => openNewTab(url)}>
      {children as any}
    </Fab>
  </Tooltip>
);

const Component: FCX = ({ className }) => (
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
    <GradientButton onClick={() => openNewTab('https://kula.konomi.app')}>
      kintoneだけでブログが書けます
    </GradientButton>
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
