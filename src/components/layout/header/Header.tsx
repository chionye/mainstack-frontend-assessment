/** @format */

import { Box, Flex, Container } from "@chakra-ui/react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import AppsDropdown from "./AppsDropdown";
import MenuIcons from "./MenuIcons";
import UserMenu from "./UserMenu";
import Query from "@/api/query";
import { BASE_URL, USERS } from "@/constants/endpoints";
import { NavItems, AppItems, MenuItems, MenuIcon } from "@/utils/page-props";

const Header = () => {
  const queryParamsArray = [
    {
      id: "user",
      url: `${BASE_URL}${USERS}`,
    },
  ];
  const { queries } = Query(queryParamsArray);

  const userData = queries[0]?.data?.data;

  // Show loading state or return null if user data is not available
  if (!userData) {
    return (
      <Box
        as='header'
        w='full'
        borderBottom='1px'
        borderColor='gray.200'
        bg='white'
        position='sticky'
        top={0}
        zIndex={1000}>
        <Container maxW='container.xl' py={4}>
          <Flex align='center' justify='space-between'>
            <Logo />
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      as='header'
      w='full'
      borderBottom='1px'
      borderColor='gray.200'
      bg='white'
      position='sticky'
      top={0}
      zIndex={1000}>
      <Container maxW='container.xl' py={4}>
        <Flex align='center' justify='space-between' gap={8}>
          {/* Logo */}
          <Box flexShrink={0}>
            <Logo />
          </Box>

          {/* Navigation */}
          <Flex
            as='nav'
            align='center'
            gap={2}
            flex={1}
            display={{ base: "none", lg: "flex" }}>
            {NavItems.map(
              (
                item: { label: string; link: string; icon: string },
                index: number
              ) =>
                item.label !== "Apps" ? (
                  <NavItem
                    key={index}
                    label={item.label}
                    link={item.link}
                    icon={item.icon}
                  />
                ) : (
                  <AppsDropdown key={index} appItems={AppItems} />
                )
            )}
          </Flex>

          {/* Right Menu */}
          <Flex align='center' gap={2} flexShrink={0}>
            <MenuIcons icons={MenuIcon} />
            <UserMenu user={userData} menuItems={MenuItems} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
