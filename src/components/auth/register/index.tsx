import { useRef, useState } from "react";
import { sha512 } from "js-sha512";
import authAPI from "../../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const onRegister = async () => {
    if (!name || !email || !password) {
      alert("모든 항목을 입력해주세요.");

      if (emailInputRef.current != null) {
        emailInputRef.current.focus();
      }
      return;
    }

    const request = {
      name,
      email,
      password: sha512(password),
    };

    try {
      await authAPI.register(request);
      alert("회원가입이 정상적으로 완료되었습니다");
      navigate("/login");
    } catch (error: any) {
      const status = error.response.data.status;

      if (status === 409) {
        alert("이 이메일은 이미 등록되어있습니다.");
        return;
      }
    }
  };

  return (
    <Allstyled>
      <h1>회원가입</h1>
      <div>
        <Group>
          <NameInput
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <HighLight className="highlight"></HighLight>
          <Bar className="bar"></Bar>
          <Label>Name</Label>
        </Group>
        <br /> <br />
        <Group>
          <NameInput
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <HighLight className="highlight"></HighLight>
          <Bar className="bar"></Bar>
          <Label>Email</Label>
        </Group>
        <br /> <br />
        <Group>
          <NameInput
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <HighLight className="highlight"></HighLight>
          <Bar className="bar"></Bar>
          <Label>Password</Label>
        </Group>
        <ButtonBox>
          <Button onClick={onRegister}>회원가입하기</Button>
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
        </ButtonBox>
      </div>
    </Allstyled>
  );
};

const Allstyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Group = styled.div`
  position: relative;
`;

const NameInput = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 250px;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;

  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #5264ae;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ .bar:before,
  &:focus ~ .bar:after {
    width: 50%;
  }

  &:focus ~ .highlight {
    animation: inputHighlighter 0.3s ease;
  }

  @keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
`;

const Label = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 200px;

  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  &:before {
    left: 50%;
  }

  &:after {
    right: 50%;
  }
`;

const HighLight = styled.span`
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.5rem;
  color: #111827;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.75rem 1rem;
  text-align: center;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;

  &:hover {
    background-color: #f9fafb;
  }

  &:focus {
    outline: 2px solid rgba(0, 0, 0, 0.1);
    outline-offset: 2px;
  }

  &:focus-visible {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

export default Register;
