/** @format */

import { TailSpin } from "react-loader-spinner";
import { Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justify='center' align='center' height='100vh'>
      <TailSpin     
        visible={true}
        height='80'
        width='80'
        color='#131316'
        ariaLabel='tail-spin-loading'
        radius='1'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </Flex>
  );
};

export default Loader;
