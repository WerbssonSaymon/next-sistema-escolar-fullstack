import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Tbody, Td, Th, Thead, Tr } from "./TableStyled";

// Definindo os tipos para as props e os usuários
interface User {
  id?: number;
  nome: string;
  email: string;
  fone: string;
  data_nascimento: string;
}

interface GridProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setOnEdit: (user: User | null) => void;
}

export default function GridUser({ users, setUsers, setOnEdit }: GridProps) {
  const handleEdit = (item: User) => {
    setOnEdit(item);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response.data);
    }
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.fone}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id!)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
