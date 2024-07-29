import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FormUser from "./FormUser";
import GridUser from "./GridUser";
import { Container } from "./ContainerStyled";

// Definindo os tipos para os usuários
interface User {
  id?: number;
  nome: string;
  email: string;
  fone: string;
  data_nascimento: string;
}

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
        <h2>USUÁRIOS</h2>
        <FormUser onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <GridUser setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}
