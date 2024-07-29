import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import FormUser from "./FormUser";
import GridUser from "./GridUser";

// Definindo os tipos para os usuários
interface User {
  id?: number;
  nome: string;
  email: string;
  fone: string;
  data_nascimento: string;
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

export default function AppUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [onEdit, setOnEdit] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a: User, b: User) => (a.nome > b.nome ? 1 : -1)));
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <FormUser onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <GridUser setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}
