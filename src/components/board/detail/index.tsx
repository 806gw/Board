import { useEffect, useState } from "react";
import boardAPI from "../../../api/board";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getUserId } from "../../../utils/user";

const BoardDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userId = getUserId();

  const [postDetail, setPostDetail] = useState<any>(null);

  const onDelete = async () => {
    try {
      const id = Number(params.id);

      await boardAPI.deletePost(id);
      alert("정상적으로 글이 삭제되었습니다.");

      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchBoard = async (id: any) => {
      const response = await boardAPI.fetchDetail(id);

      setPostDetail(response.data);
      console.log(response.data);
    };

    const id = params.id;

    fetchBoard(id);
  }, []);

  if (postDetail === null) {
    return <></>;
  }
  return (
    <div>
      <div>
        <h1>{postDetail.title}</h1>
        <p>{postDetail.content}</p>
        <span>
          {postDetail.user === null ? "탈퇴된 사용자" : postDetail.user.name}
        </span>
      </div>
      {postDetail.user === null || postDetail.user.id !== userId ? (
        <></>
      ) : (
        <div>
          <Link to={`/posts/${postDetail.id}/edit`}>
            <button>수정하기</button>
          </Link>
          <button onClick={onDelete}>삭제하기</button>
        </div>
      )}
    </div>
  );
};
export default BoardDetail;
