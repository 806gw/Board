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

  const [totalPages, setTotalPages] = useState(0);
  const [pagesIndex, setPagesIndex] = useState(0);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState<number[][]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await boardAPI.fetchAll(page - 1);

        const boards = response.data.content;
        setTotalPages(response.data.totalPages);
        setBoards(boards);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchBoards();
  }, [page]);

  useEffect(() => {
    let result: number[][] = [];
    let temp = [];

    for (let i = 1; i <= totalPages; i++) {
      temp.push(i);

      if (temp.length % 5 === 0) {
        result.push(temp);

        temp = [];
      }
    }
    if (temp.length > 0) {
      result.push(temp);
    }
    setPages(result);
  }, [totalPages]);

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
          : IsError
          ? "Error!"
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

      <div>
        {
          pagesIndex > 0 ?
          <button onClick={() => setPagesIndex((prev) => prev - 1)}>이전</button>
          :
          <></>
        }

        <div>
          {pages[pagesIndex]?.map((pageNumber: any) => {
            return <button key={pageNumber} onClick={() => setPage(pageNumber)} style={{
              background: pageNumber === page ? 'red' : 'white',
              cursor: "pointer"
            }}>{pageNumber}</button>;
          })} 
        </div>
        {
          pagesIndex < pages.length - 1 ?
          <button onClick={() => setPagesIndex((prev) => prev + 1)}>다음</button>
          :
          <></>
        }
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
`;

export default BoardList;
