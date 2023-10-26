import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { forwardRef } from 'react';
import styles from '../../styles/global.module.scss';

export const SideNavItem = (props) => {
  const {
    active = false,
    disabled,
    external,
    icon,
    path,
    title,
    onItemClicked,
  } = props;

  const handleItemClick = () => {
    if (onItemClicked && title) {
      onItemClicked(title.toLowerCase());
    }
  };

  const ButtonBaseWithRef = forwardRef((props, ref) => (
    <ButtonBase {...props} ref={ref} />
  ));

  const LinkComponent = forwardRef((props, ref) => (
    <ButtonBaseWithRef
      {...props}
      ref={ref}
      sx={{ textDecoration: 'none', ...props.sx }}
    />
  ));

  return (
    <li>
      {path && !external ? (
        <NextLink href={path} passHref className={styles.noUnderline}>
          <LinkComponent
            onClick={handleItemClick}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              pl: '16px',
              pr: '16px',
              py: '6px',
              textAlign: 'left',
              width: '100%',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'white',
                '& > span': {
                  color: '#164cc8',
                },
              },
              ...(active && {
                backgroundColor: 'white',
              }),
            }}
          >
            {icon && (
              <Box
                component="span"
                sx={{
                  alignItems: 'center',
                  color: 'neutral.400',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  mr: 2,
                  ...(active && {
                    color: '#164cc8',
                  }),
                }}
              >
                {icon}
              </Box>
            )}
            <Box
              component="span"
              className="childBox"
              sx={{
                color: 'white',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                ...(active && {
                  color: '#164cc8',
                }),
                ...(disabled && {
                  color: '#000',
                }),
              }}
            >
              {title}
            </Box>
          </LinkComponent>
        </NextLink>
      ) : (
        <ButtonBase
          component={external ? 'a' : undefined}
          href={external ? path : undefined}
          target={external ? '_blank' : undefined}
          onClick={handleItemClick}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            },
          }}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main',
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'primary.main',
              }),
              ...(disabled && {
                color: 'neutral.500',
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  onItemClicked: PropTypes.func,
};

export default SideNavItem;
