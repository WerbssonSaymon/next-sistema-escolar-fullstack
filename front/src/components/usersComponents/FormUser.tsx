import axios from "axios";
import { useEffect, useRef, FormEvent } from "react";
import { toast } from "react-toastify";
import { Button, FormContainer, Input, InputArea, Label } from "./FormStyled";

// Definindo os tipos para as props e os usuários
interface User {
  id?: number;
  nome: string;
  email: string;
  fone: string;
  data_nascimento: string;
}

interface FormProps {
  getUsers: () => void;
  onEdit: User | null;
  setOnEdit: (user: User | null) => void;
}

export default function FormUser({ getUsers, onEdit, setOnEdit }: FormProps) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (onEdit && ref.current) {
      const user = ref.current;
      (user.nome as HTMLInputElement).value = onEdit.nome;
      (user.email as HTMLInputElement).value = onEdit.email;
      (user.fone as HTMLInputElement).value = onEdit.fone;
      (user.data_nascimento as HTMLInputElement).value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!ref.current) return;

    const user = ref.current;

    if (
      !(user.nome as HTMLInputElement).value ||
      !(user.email as HTMLInputElement).value ||
      !(user.fone as HTMLInputElement).value ||
      !(user.data_nascimento as HTMLInputElement).value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const response = await axios.put(`http://localhost:8800/${onEdit.id}`, {
          nome: (user.nome as HTMLInputElement).value,
          email: (user.email as HTMLInputElement).value,
          fone: (user.fone as HTMLInputElement).value,
          data_nascimento: (user.data_nascimento as HTMLInputElement).value,
        });
        toast.success(response.data);
      } else {
        const response = await axios.post("http://localhost:8800", {
          nome: (user.nome as HTMLInputElement).value,
          email: (user.email as HTMLInputElement).value,
          fone: (user.fone as HTMLInputElement).value,
          data_nascimento: (user.data_nascimento as HTMLInputElement).value,
        });
        toast.success(response.data);
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }

    (user.nome as HTMLInputElement).value = "";
    (user.email as HTMLInputElement).value = "";
    (user.fone as HTMLInputElement).value = "";
    (user.data_nascimento as HTMLInputElement).value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
}
