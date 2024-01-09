import { useEffect, useState } from "react";
import boardAPI from "../../../api/board";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserId } from "../../../utils/user";
import styled from "styled-components";

const BoardDetail = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [IsError, setIsError] = useState(false);

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
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await boardAPI.fetchDetail(id);

        setPostDetail(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    const id = params.id;

    fetchBoard(id);
  }, []);

  if (IsLoading) {
    return <p>Loading</p>;
  }
  if (IsError) {
    return <p>Error</p>;
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
            <EditBtn>수정하기</EditBtn>
          </Link>
          <DeleteBtn onClick={onDelete}>삭제하기</DeleteBtn>
        </div>
      )}
    </div>
  );
};

const EditBtn = styled.button`
  width: 100%;
  padding: 10px 14px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 14px;
  background-color: red;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export default BoardDetail;
