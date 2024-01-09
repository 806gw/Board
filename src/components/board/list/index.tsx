import { useEffect, useState } from "react";
import dayjs from "dayjs";
import boardAPI from "../../../api/board";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isErrored } from "stream";

const BoardList = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [IsError, setIsError] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await boardAPI.fetchAll();

        console.log(response);

        const boards = response.data.content;
        setBoards(boards);
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false);
    };

    fetchBoards();
  }, []);

  return (
    <AllStyled>
      <TitleBox>
      <Title>게시글 모음</Title>
      <Link to={"/posts/write"}>
        <Button>글 작성하기</Button>
      </Link>
      </TitleBox>
      <div>
        {IsLoading
          ? "Loading.."
          :
          IsError ?
          'Error!'
          : boards.map((boards: any) => {
              return (
                <Link key={boards.id} to={`/posts/${boards.id}`}>
                  <Board key={boards.id}>
                    <h3>{boards.title}</h3>

                    <time>
                      {dayjs(boards.createdAt).format(
                        "YYYY년 MM월 DD일 HH시 MM분"
                      )}
                    </time>

                    <p>
                      작성자 :{" "}
                      {boards.user === null
                        ? "탈퇴된 사용자입니다."
                        : boards.user.name}
                    </p>
                  </Board>
                </Link>
              );
            })}
      </div>
    </AllStyled>
  );
};

const AllStyled = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const Board = styled.div`
  width: 650px;
  height: 100%;
  border: 1px solid gray;
  padding: 6px;
  margin: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 5px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`

export default BoardList;
