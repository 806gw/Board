import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import boardAPI from "../../../api/board"
import styled from "styled-components";

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() =>  {
    const fetchBoards = async () => {
      const response = await boardAPI.fetchAll();

      console.log(response);

      const boards = response.data.content

      setBoards(boards);

      console.log(boards)
    }

    fetchBoards();
  }, [])

  return(
    <AllStyled>
      <Title>게시글 모음</Title>
      <div>
        {
          boards.map((boards: any) => {
            return (
              <Board key={boards.id}>
                <h3>{boards.title}</h3>
                
                <time>{dayjs(boards.createdAt).format('YYYY년 MM월 DD일 HH시 MM분')}</time>

                <p>작성자 : {boards.user === null ? '탈퇴된 사용자입니다.' : boards.user.name}</p>
              </Board>
            );
          })
        }
      </div>
    </AllStyled>
  )
}

const AllStyled = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Board = styled.div`
  width: 600px;
  height: 100%;
  border: 1px solid gray;
  padding: 6px;
  margin: 10px;
`

export default BoardList