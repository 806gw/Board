import { useEffect, useState } from "react";
import styled from "styled-components";
import boardAPI from "../../../api/board";
import { useNavigate, useParams } from "react-router-dom";
import AuthChecker from "../../auth/checker";

const BoardForm = () => {
  const params = useParams();

  const postId = Number(params.id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!title || !content) {
      alert("내용을 모두 입력해주세요.");
      return;
    }
    try {
      const request = {
        title,
        content,
      };

      if (isNaN(postId)) {
        await boardAPI.createPost(request);
        alert("글 작성이 완료되었습니다.");
      } else {
        await boardAPI.updatePost(postId, request);
        alert("글 수정이 완료되었습니다.");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isNaN(postId)) {
      return;
    }

    const fetchBoard = async (id: any) => {
      const response = await boardAPI.fetchDetail(id);

      const post = response.data;

      setTitle(post.title);
      setContent(post.content);
    };
    fetchBoard(postId);
  }, [postId]);
  return (
    <div>
      <AuthChecker />
      
      <div>
        <div>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(event: any) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <ContentInput
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(event: any) => setContent(event.target.value)}
          ></ContentInput>
          <Button onClick={onSubmit}>
            {isNaN(postId) ? "작성하기" : "수정하기"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TitleInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #dedede;
  padding: 10px 14px;
`;

const ContentInput = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 400px;
  padding: 10px 14px;
  border: 1px solid #dedede;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 14px;
  margin-left: 15px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 5px;
  cursor: pointer;
`;

export default BoardForm;
