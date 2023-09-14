import { Button, ButtonProps } from "@chakra-ui/react";

interface IDefaultProps {
  title: string;
  onClick?: () => void;
  size?: ButtonProps["size"];
  color?: ButtonProps["color"];
  bg?: ButtonProps["bg"];
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Default = ({ title, ...rest }: IDefaultProps) => {
  return (
    <Button
      _hover={{
        bg: "blue.500",
      }}
      bg={"blue.400"}
      color={"white"}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default Default;
