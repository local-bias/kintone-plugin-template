import React, { FC, FCX, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Button, Fab, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExtensionIcon from '@mui/icons-material/Extension';

import { URL_HOMEPAGE, URL_TWITTER, URL_GITHUB, URL_INQUIRY } from '@common/static';

const openNewTab = (path: string) => window.open(path, '_blank');

const FabWithTip: FC<{ title: string; url: string; children: NonNullable<ReactNode> }> = ({
  children,
  title,
  url,
}) => (
  <Tooltip title={title} aria-label={title}>
    <Fab size='small' onClick={() => openNewTab(url)} className='pale'>
      {children as any}
    </Fab>
  </Tooltip>
);

const Component: FCX = ({ className }) => (
  <aside className={className}>
    <FabWithTip title='プラグイン一覧' url={URL_HOMEPAGE}>
      <ExtensionIcon />
    </FabWithTip>
    <FabWithTip title='ツイッター' url={URL_TWITTER}>
      <TwitterIcon />
    </FabWithTip>
    <FabWithTip title='GitHub' url={URL_GITHUB}>
      <GitHubIcon />
    </FabWithTip>
    <Button
      color='inherit'
      variant='contained'
      disableElevation
      onClick={() => openNewTab(URL_INQUIRY)}
    >
      お問い合わせ
    </Button>
    <Button
      color='inherit'
      variant='contained'
      disableElevation
      onClick={() => openNewTab('https://kula.konomi.app')}
      sx={{
        textTransform: 'none',
        background: 'linear-gradient(45deg, #acb6e5 30%, #64bde4 90%)',
        color: '#fff',
      }}
    >
      kintoneで自社メディアを作りませんか？
    </Button>
  </aside>
);

const StyledComponent = styled(Component)`
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  text-transform: none;

  .pale {
    color: #78909c;
    box-shadow: none;
  }
`;

export default StyledComponent;
