import { Provider } from "react-redux";
import { DarkMode } from "~/components/common";
import { store } from "~/lib/store/store";


export default {
  component: DarkMode,
  title: "DarkMode",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

export const Default = {};
