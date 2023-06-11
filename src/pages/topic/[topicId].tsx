import { type NextPage } from "next";
import { useRouter } from "next/router";

const Topic: NextPage = () => {
  const router = useRouter();
  //   const { snippetId: roomId, roomName } = router.query as {
  //     snippetId: string;
  //     roomName: string;
  //   };
  console.log("===========================>", router.query);
  return <div>topics</div>;
};

export default Topic;
