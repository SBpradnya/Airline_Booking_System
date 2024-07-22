import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontSize: "md",
        color: "gray.600",
        lineHeight: "tall",
      },
    },
  },
});

export default theme;
