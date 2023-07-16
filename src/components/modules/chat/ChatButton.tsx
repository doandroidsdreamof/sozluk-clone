import { BsFillChatDotsFill } from "react-icons/bs";
import { useAppDispatch } from "~/lib/store/hooks";
import { chatInterfaceToggle } from "~/lib/store/reducers/messageSlice";
import { chatBoxClose } from "~/lib/store/reducers/messageSlice";
import Button from "../button/Button";

const ChatButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(chatInterfaceToggle());
        dispatch(chatBoxClose());
      }}
      className="p-2"
      size="tiny"
      type="primary"
    >
      <BsFillChatDotsFill />
    </Button>
  );
};

export default ChatButton;
