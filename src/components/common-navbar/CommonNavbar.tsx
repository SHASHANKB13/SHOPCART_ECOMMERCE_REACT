import {
  AppShell,
  Box,
  Burger,
  Group,
  Indicator,
  rem,
  useMantineTheme,
  Drawer,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { useRef, useState } from "react";
import { IconBell } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";

// import { PersonalTaxImgProps } from "../../personalTaxImage";

export default function CommonNavBar() {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [drawerOpened, { open, close }] = useDisclosure(false);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      padding="md"
      bg={theme.colors.gray[0]}
    >
      <AppShell.Header bg={theme.colors.deepBlue[4]}>
        <Group
          h="100%"
          px="md"
          justify={!mobile ? "flex-end" : "space-between"}
        >
          <Box
            bg={theme.colors.gray[1]}
            mx={rem(10)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: " #0077b6 1px solid",
              borderRadius: "50%",
              cursor: "pointer",
              color: theme.colors.gray[8],
              padding: "6px",
              height: rem(40),
              width: rem(40),
            }}
            onClick={open}
          >
            <Indicator
              inline
              size={12}
              offset={7}
              color="red"
              withBorder
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconBell stroke={1} />
            </Indicator>
          </Box>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
