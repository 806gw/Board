import { useEffect, useState } from "react"
import boardAPI from "../../../api/board"
import { useParams, useSearchParams } from "react-router-dom"

const BoardDetail = () => {
  const params = useParams()

  const [postDetail, setPostDetail] = useState<any>(null);

  useEffect(() => {
    const fetchBoard = async(id:any) => {
      const response = await boardAPI.fetchDetail(id);

      setPostDetail(response.data)
      console.log(response.data)
    }

    const id = params.id;

    fetchBoard(id);
  }, [])

  if (postDetail === null) {
    return <></>
  }
  return (
    <div>
      <h1>{postDetail.title}</h1>
       <p>{postDetail.content}</p>
       <span>{postDetail.user === null ? "탈퇴된 사용자" : postDetail.user.name}</span>
    </div>
  )
}
export default BoardDetail